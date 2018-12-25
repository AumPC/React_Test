var express = require('express')
var router = express.Router()
var axios = require('axios')


async function query_table_request(startDate, endDate) {
    let egressRes = await get_count("Egress", [{ "regexp": { "src_ip.keyword": "158.108.*" } },
                                               { "regexp": { "src_ip.keyword": "10.*" } } ],
                                               startDate, endDate)
    let ingressRes = await get_count("Ingress", [{ "regexp": { "dst_ip.keyword": "158.108.*" } },
                                                 { "regexp": { "dst_ip.keyword": "10.*" } } ],
                                                 startDate, endDate)
    let users = await Object.keys((egressRes)).concat(Object.keys((ingressRes))).reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
    this.userTable = []
    users.forEach(user => {
        let ingress = (user in ingressRes) ? 1 : 0
        let egress = (user in egressRes) ? 1 : 0
        let time = 1
        if(ingress && egress) {
            time = egressRes[user]['last_req'] < ingressRes[user]['last_req'] ? 1 : 0
        } else if(ingress && !egress) {
            time = 1
        } else if(!ingress && egress) {
            time = 0
        }
        this.userTable.push( [ { 
            user: (user) , 
            ingress: (ingress) ? ingressRes[user]['count'] : 0 , 
            egress: (egress) ? egressRes[user]['count'] : 0, 
            time: (time) ? ingressRes[user]['last_req'] : egressRes[user]['last_req'],
            ip: (time) ? ingressRes[user]['ip'] : egressRes[user]['ip']
        }])
    });
    // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 
    // console.log("userTable", this.userTable, users)
    return {
        requests: this.userTable,
        users: (users)
    }
}

async function get_count(types, query, startDate, endDate) {
    if( types == "Egress") {
        var ip = "src_ip"
    } else {
        var ip = "dst_ip"
    }
    this.queryCount = await {
        "query": {
            "bool": {
              "should": [ query ],
              "minimum_should_match" : 1,
              "must": [{
                "range": {
                  "req_time_human": {
                    "gte": startDate,
                    "lte": endDate
                  }
                },
              }],
            },
          },
        "size": 1,
        "aggs": {
            "user_group": {
                "terms": {
                    "field": "user_id_client.keyword",
                    "size": 10000
                },
                "aggs": {
                    "last_req": {
                        "top_hits": {
                            "sort": [{
                                "req_time_human": "desc"
                            }],
                            "_source": {
                                "includes": [
                                    "req_time_human",
                                    ip
                                ]
                            },
                            "size": 1
                        }
                    }
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
            res['data']['aggregations']['user_group']['buckets'].forEach(data => {
                if(data['key'] != '-') this.datas[data['key']] = {count: data['doc_count'], last_req: data['last_req']['hits']['hits'][0]['_source']['req_time_human'], ip: data['last_req']['hits']['hits'][0]['_source'][ip]};
            });
            // console.log(types, this.datas)
            return this.datas
        })
}

router.get('/', (req, res) => {
    var startDate = (req.query.startDate) ? req.query.startDate : "2017-04-09T20:00:00.000Z"
    var endDate = (req.query.endDate) ? req.query.endDate : "now"
    query_table_request(startDate, endDate).then((table) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(table);
    });
})

module.exports = router