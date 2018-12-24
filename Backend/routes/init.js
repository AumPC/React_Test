var express = require('express')
var router = express.Router()
var axios = require('axios')

async function get_time(key) {
    this.queryCount = await {
        "size": 0,
        "aggs": {
            "time": {
                "stats": {
                    "field": "req_time_human"
                }
            }
        }
    }
    return await axios.get("http://10.3.132.198:9200/" + key + "/_search", {
            params: {
                source: JSON.stringify(this.queryCount),
                source_content_type: 'application/json'
            }
        })
        .then((res) => {
            this.datas = {
                'min': res['data']['aggregations']['time']['min_as_string'],
                'max': res['data']['aggregations']['time']['max_as_string']
            }
            // console.log(types, this.datas)
            return this.datas
        })
}

async function get_index() {
    return await axios.get("http://10.3.132.198:9200/_aliases", {})
        .then((res) => {
            this.datas = Object.keys(res['data'])
            // this.datas = {
            //     'min': res['data']['aggregations']['time']['min_as_string'],
            //     'max': res['data']['aggregations']['time']['max_as_string']
            // }
            return this.datas
        })
}

router.get('/:key/time', (req, res) => {
    var key = req.params.key;
    get_time(key).then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
})

router.get('/index', (req, res) => {
    get_index().then((data) => {
        // res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
})

module.exports = router