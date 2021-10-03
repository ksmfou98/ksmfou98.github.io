![](https://images.velog.io/images/ksmfou98/post/a20c7e78-bfc7-4288-a6a7-d20f66e26151/image.png)

Node.js + express서버를 heroku에 배포하는 방법을 알아보자

배포하기 전에 package.json 에 scripts의 start 부분을 설정해줘야 한다.
start : 빌드된 파일의 실행파일

예시

```
"start": "node dist/app.js",
```

## Heroku 회원가입

https://www.heroku.com/ 에 접속 후 회원가입을 한다
회원 가입이 완료가 되면 로그인을 한다

## Heroku CLI 설치

https://devcenter.heroku.com/articles/heroku-cli#download-and-install 에 접속 후 컴퓨터의 OS에 맞춰서 설치를 완료 해준다.

<br />

설치가 완료가 되었다면 터미널을 열어서 login을 해준다

```shell
$ heroku login
```

명령어를 입력하면 브라우저가 열린 뒤 로그인이 완료된다.

## Heroku에 배포하기

배포하려는 폴더 경로에서 터미널에 다음 명령어를 입력해 준다.

```shell
$ heroku create
```

socket io를 사용하기 위해 http-session-affinity 설정

```shell
$ heroku features:enable http-session-affinity
```

<br />

명령어를 입력 후 완료가 되면 다시 [heroku](https://www.heroku.com/)에 접속 해보자. 그럼 프로젝트 하나가 생성이 됐다.
![](https://images.velog.io/images/ksmfou98/post/f733c252-8351-4336-863d-f70c519a5598/image.png)

<br />

프로젝트를 클릭후 deploy 탭을 누른 후 Github Repository 연동

![](https://images.velog.io/images/ksmfou98/post/e1f856ec-8451-4f8b-8511-92b35525f30c/image.png)

<br />

빨간줄로 밑줄 친 부분에서 배포할 repository를 검색 후 선택해준다.

repository까지 선택이 완료가 되었으면 Settings 탭으로 이동하자

Build 팩 설정을 위해 Add buildpack 클릭

![](https://images.velog.io/images/ksmfou98/post/e47ff6d9-caaf-443e-a9e2-afd019b49891/image.png)

<br />

Enter Buildpack URL 부분에 https://github.com/timanovsky/subdir-heroku-buildpack 입력 후 Save changes 클릭

![](https://images.velog.io/images/ksmfou98/post/ef055aec-1b0a-4733-a037-931c95b932d0/image.png)

<br />

다시 Add buildpack 클릭후 nodejs 선택 후 Save changes

![](https://images.velog.io/images/ksmfou98/post/ad906eb0-437d-47ef-8158-93687dfbbeb7/image.png)

<br />

그럼 아래와 같이 2개가 추가 되었다
![](https://images.velog.io/images/ksmfou98/post/8f3258a6-8873-4229-a788-198fe793aaca/image.png)

<br />

다음은 프로젝트의 경로 설정을 위해서 Reveal Config Vars 클릭

![](https://images.velog.io/images/ksmfou98/post/f3a908ac-ba2c-41dd-a17f-d1e6c5db7301/image.png)

<br />

KEY 부분에 PROJECT_PATH 입력 VALUE 부분에 배포할 프로젝트의 경로 입력 ex) server

![](https://images.velog.io/images/ksmfou98/post/6af7519e-8e8f-41a9-b087-dc6097cc3b36/image.png)

<br />

입력이 완료되었으면 Hide Config Vars 클릭

이제 아래에 보면 주소가 생겼다.

![](https://images.velog.io/images/ksmfou98/post/91a40443-58a1-4e1e-a62b-e1cc0c9bf632/image.png)

<br />

마지막으로 deploy 탭에서 아래에 Deploy Branch 버튼을 클릭하게 되면 배포가 완료가 된다.

![](https://images.velog.io/images/ksmfou98/post/5e7b2c74-6348-495a-b8bc-6857b7ff67c1/image.png)

<br />
