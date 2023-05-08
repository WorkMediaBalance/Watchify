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
s3 = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
bucket_name = os.environ.get('AWS_STORAGE_BUCKET_NAME')
print(aws_access_key_id, aws_secret_access_key, bucket_name)

# 로컬 파일 경로
local_folder = 'C:\\Users\\SSAFY\\Desktop\\Pjt_3\\posters\\'
for i in range(10):
    # print(f'================================= {i} ===============================')
    try:
        file = local_folder + str(i) +'.jpg'
        with open(file, 'rb') as f:
            s3.upload_fileobj(f, bucket_name, f'poster/{i}.jpg')
        # s3.upload.fileobj(file, bucket_name, f'poster/{i}.jpg')
            print(file)
    except:
        continue
