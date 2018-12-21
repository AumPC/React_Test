var express = require('express')
var router = express.Router()
var axios = require('axios')
const parseDomain = require("parse-domain");

async function query_domain_request(interval, sort) {
    this.queryCount = await {
        "size": 1,
        "aggs": {
            "hostname": {
                "terms": {
                    "field": "hostname.keyword",
                    "size": 10000
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
            var count = {}
            res['data']['aggregations']['hostname']['buckets'].forEach(data => {
                if (data.key != '-') {
                    var extract = parseDomain(data['key'])

                    if (extract) {
                        if (!(extract.tld in count)) {
                            count[extract.tld] = {}
                            count[extract.tld][extract.domain] = {}
                            count[extract.tld][extract.domain][extract.subdomain] = data['doc_count']
                        } else if (!(extract.domain in count[extract.tld])) {
                            count[extract.tld][extract.domain] = {}
                            count[extract.tld][extract.domain][extract.subdomain] = data['doc_count']
                        } else if (!(extract.subdomain in count[extract.tld][extract.domain])) {
                            count[extract.tld][extract.domain][extract.subdomain] = data['doc_count']
                        } else {
                            count[extract.tld][extract.domain][extract.subdomain] += data['doc_count']
                        }
                    }
                }
            });
            this.datas = Object.keys(count).map(tld => {
                var child_tld = Object.keys(count[tld]).map(domain => {
                    var child_domain = Object.keys(count[tld][domain]).map(subdomain => {
                        return { name: (subdomain), size: count[tld][domain][subdomain]}
                    });
                    return { name: (domain), children: (child_domain)}
                });
                return { name: (tld), children: (child_tld)}
            });
            console.log(this.datas)
            return this.datas
        })
}

router.get('/', (req, res) => {
    const interval = req.query.interval;
    const sort = req.query.sort;
    query_domain_request(interval, sort).then((domain) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(domain);
    });
})

module.exports = router