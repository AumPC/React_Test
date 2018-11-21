var express = require('express')
var router = express.Router()
var axios = require('axios')

router.use(function timeLog(req, res, next) {
  next()
})

async function query_method(interval) {
  this.queryMethod = {
    "size": 0,
    "aggs": {
      "req_time_group": {
        "date_histogram": {
          "field": "req_time_human",
          "interval": "30s"
        },
        "aggs": {
          "method_group": {
            "terms": {
              "field": "method.keyword"
            }
          }
        }
      }
    }
  }
  return axios.get("http://10.3.132.198:9200/web-anon/_search", {
      params: {
        source: JSON.stringify(this.queryMethod),
        source_content_type: 'application/json'
      }
    })
    .then((res) => {
      this.datas = {}
      this.time_range = []
      res['data']['aggregations']['req_time_group']['buckets'].forEach((data) => {
        if (!(data['key_as_string'] in this.datas)) {
          this.datas[data['key_as_string']] = {};
        }
        data['method_group']['buckets'].forEach((type_method) => {
          this.datas[data['key_as_string']][type_method['key']] = type_method['doc_count'];
        })
      })
      this.dataMethod = {"GET": [], "HEAD": [], "POST": [], "HTTPS": [], "DELETE": [], "PUT": [], "CONNECT": [], "OPTIONS": [], "TRACE": [], "PATCH": []}
      for (var key in this.datas) {
        for (var methods in this.dataMethod) {
          this.dataMethod[methods].push((this.datas[key][methods] !== undefined) ? this.datas[key][methods] : 0)
        }
      }
      console.log("DataMethod", this.dataMethod, Object.keys(this.datas))
      return { "methods": this.dataMethod, "ticks": Object.keys(this.datas) }
    })
    .catch(error => {
      return error
    });
}

async function query_request(interval) {
  let egressRes = await get_count("Egress", [{ "regexp": { "src_ip.keyword": "158.108.*" } },
                                                  { "regexp": { "src_ip.keyword": "10.*" } } ])
  let ingressRes = await get_count("Ingress", [{ "regexp": { "dst_ip.keyword": "158.108.*" } },
                                                  { "regexp": { "dst_ip.keyword": "10.*" } } ])
  let date = await Object.keys((egressRes)).concat(Object.keys((ingressRes))).reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);
  this.dataReq = {
    Egress: [],
    Ingress: []
  }
  date.forEach(datekey => {
    this.dataReq.Egress.push({
      "date": datekey,
      "count": (datekey in egressRes) ? egressRes[datekey] : 0
    })
    this.dataReq.Ingress.push({
      "date": datekey,
      "count": (datekey in ingressRes) ? ingressRes[datekey] : 0
    })
  });
  console.log("DataReq", this.dataReq, date)
  return { requests: this.dataReq, date: (date) }
}

async function get_count(types, query) {
  this.queryCount = await {
    "query": {
      "bool": {
        "should": [ query ]
      }
    },
    "size": 0,
    "aggs": {
      "req_time_group": {
        "date_histogram": {
          "field": "req_time_human",
          "interval": "30s"
        }
      }
    }
  }
  return await axios.get("http://10.3.132.198:9200/web-anon/_search", {
    params: {
      source: JSON.stringify(this.queryCount),
      source_content_type: 'application/json'
    }
  })
  .then((res) => {
    this.datas = {}
    res['data']['aggregations']['req_time_group']['buckets'].forEach(data => {
      this.datas[data['key_as_string']] = data['doc_count'] ;
    });
    console.log(types, this.datas)
    return this.datas
  })
}

router.get('/request', (req, res) => {
  const interval = req.query.interval;
  query_request(interval).then((requests) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(requests);
  });
});

router.get('/method', (req, res) => {
  const interval = req.query.interval;
  query_method(interval).then((methods) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(methods);
  });
});

router.get('/', (req, res) => res.send('Hello World!'))

module.exports = router