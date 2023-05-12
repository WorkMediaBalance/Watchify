import environ
import os
import boto3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

aws_access_key_id = os.environ.get('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
region_name = os.environ.get('AWS_S3_BUCKET_REGION')
s3 = boto3.client(
    service_name='s3',
    region_name=region_name,
    aws_access_key_id=aws_access_key_id, 
    aws_secret_access_key=aws_secret_access_key
    )
bucket_name = os.environ.get('AWS_STORAGE_BUCKET_NAME')

# 로컬 파일 경로
poster_folder = 'C:\\Users\\SSAFY\\Desktop\\Pjt_3\\posters\\'
backdrop_folder = 'C:\\Users\\SSAFY\\Desktop\\Pjt_3\\backdrops\\'
for i in range(32000):
    print(f'================================= {i} ===============================')
    try:
        p = poster_folder + str(i) +'.jpg'
        with open(p, 'rb') as f:
            # print(f)
            s3.put_object(Body=f, Bucket=bucket_name, Key=f'poster/{i}.PNG', ACL='public-read', ContentType='image/png')
            # print(file)
            # s3.upload.fileobj(file, bucket_name, f'poster/{i}.jpg')
        b = backdrop_folder + str(i) + '.jpg'
        with open(b, 'rb') as f:
            # print(f)
            s3.put_object(Body=f, Bucket=bucket_name, Key=f'backdrop/{i}.PNG', ACL='public-read', ContentType='image/png')
            # print(file)
    except Exception as e:
        print('????',e)
        continue
