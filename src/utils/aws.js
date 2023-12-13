export const AWS_ACCESS_KEY_ID = "AKIAT476LIJYICWTL6ZC"
export const AWS_SECRET_ACCESS_KEY = "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"
export const AWS_REGION = "us-east-2"

export const getImageData = url => {
    return new Promise((resolve, reject) => {
        let urlArray = url.split("/")
        // let bucket = urlArray[2]
        let key = `${urlArray[3]}/${urlArray[4]}`
    
        var AWS = require('aws-sdk');
        let s3 = new AWS.S3({accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, region: AWS_REGION})
        let params = {Bucket: "barkrz", Key: key}
    
        s3.getObject(params, (err, data) => {
            if (err == null) {
                resolve(data)
            }else {
                reject(err)
            }      
        })
    })  
}