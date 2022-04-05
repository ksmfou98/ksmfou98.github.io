![](https://images.velog.io/images/ksmfou98/post/de191393-0b90-4f48-a753-f0a2606daae6/netlify-logo.png)

오늘은 React 프로젝트를 [Netlify](https://www.netlify.com/) 에 배포하는 방법을 알아보자 !🙄

프로젝트를 배포하기 위해서는 우선 [Netlify](https://www.netlify.com/)의 계정이 있어야 하고, 해당 프로젝트가 [Github](https://github.com/) repository에 올라와 있어야 한다.

그럼 Netlify에 회원가입이 되어있고, 배포할 프로젝트가 Github Repository에 올라와 있으면 다음 진행과정을 따라 해보자

1. 로그인 후 New site from Git 버튼 클릭

   ![](https://images.velog.io/images/ksmfou98/post/009ad87b-cb0f-4248-9976-351a48565f23/image.png)

2. GitHub 클릭

   ![](https://images.velog.io/images/ksmfou98/post/b07d7ad9-2fd0-4f0a-9a15-1c8d41f9732c/image.png)

3. 배포할 Repository 선택

   ![](https://images.velog.io/images/ksmfou98/post/30a2a5c7-c18b-4daf-8e0e-6f99d9a05663/image.png)

4. 배포 셋팅 후 Deploy site 버튼 클릭

   ![](https://images.velog.io/images/ksmfou98/post/4af7dd9b-464d-401a-b5b5-a6ef25b670d9/image.png)

> ✔ Owner : 본인  
> ✔ Branch to deploy : 배포할 깃허브 Branch 선택  
> ✔ Base directory : 배포할 프로젝트의 루트 디렉토리
>
> > client 를 배포할 경우 client입력, 폴더 자체를 배포할 경우 아무것도 입력 안해도 된다.
>
> ✔ Build command : 빌드 명령어 입력 ex) npm run build  
> ✔ Publish directory : 빌드가 완료된 후 생성된 폴더 이름 ex) dist or build

<br />

5. 아래와 같은 화면에서 2분정도 지나면 배포 완료

   ![](https://images.velog.io/images/ksmfou98/post/6a9fbdb1-c290-454e-832d-73f93e8c3f60/image.png)

6. Published 가 나오면 위에 화면 클릭시 배포된 사이트 등장!

   ![](https://images.velog.io/images/ksmfou98/post/fcb5dd0c-8644-4631-a176-b2ba5480f124/image.png)

<br />
<br />

추가로 홈페이지의 도메인 주소를 변경하고 싶을 경우 Domain settings 버튼 말고 옆에 Site settings 버튼을 누르고 Change site name을 눌러주면 된다!
