import AWS from 'aws-sdk';
import fs from 'fs';

export async function downloadFromS3(file_key: string) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY,
        });

        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            },
            region: 'us-east-1'
        });

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: file_key,
        };
        const obj = await s3.getObject(params).promise();
        const tmpDirectory = '/tmp';

        // Create the /tmp directory if it doesn't exist
        if (!fs.existsSync(tmpDirectory)) {
            fs.mkdirSync(tmpDirectory);
        }

        const file_name = `${tmpDirectory}/pdf-${Date.now()}.pdf`;
        fs.writeFileSync(file_name, obj.Body as Buffer)

        return file_name
    
    } catch (error) {
        console.log(error)
        console.error(error);
        return null
    }
}