CI/CD
2023.5.8(월)
- Kubernetes Jenkins 설치 중 Error 발생
  - 기존의 경우 Nginx에서 Jenkins를 설치했으나 쿠버네티스에서는 달라지는 이유
  - 외부 Container 구동 시 해당 Port로 연결이 안되는 문제가 발생
  - Kubernetes pods에 설치 시 Front URL과 혼동되어 문제가 발생되는 에러가 발생되었음
- 이후 추가사항
  - Kubernetes pods에 설치 후에 url을 변경하는 방법을 시도해봐야할거 같다.
  - Jenkins를 이용한 CICD를 일단 진행하는 것을 목적으로 프로젝트 진행
  - Worker node 연결 또한 필요로 한다.