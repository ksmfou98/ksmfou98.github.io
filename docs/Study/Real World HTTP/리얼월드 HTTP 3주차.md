# [리얼월드 HTTP] 스터디 3주차

<br />

리얼월드 HTTP 책 3주차 스터디 3주차이다.

<br />

## 단순한 폼 전송 방식 x-www-form-urlencoded

폼을 사용한 **POST** 전송에는 몇 가지 방식이 존재하는데 그 중 가장 단순한 전송 방식이 application/x-www-form-urlencoded 방식이다.

이 폼 전송 방식의 Body는 키와 값이 `=`로 연결되고 각 항목이 `&`로 연결된 문자열이다.

```
title=Avengers&hero=Iron Man
```

이렇게 Post의 Body에 추가하여 값을 보내게 되면, 브라우저는 Body에 있는 값을 [변환 포맷](https://datatracker.ietf.org/doc/html/rfc1866#section-8.2.1)에 따라 변환을 실시한다.
서버에서는 해당 값을 변환 알고리즘으로 복원하여 값을 받을 수 있다.

<br />

## 폼을 이용한 파일 전송 방식 Multipart/form-data

`Multipart/form-data` 방식은 웹 클라이언트가 요청을 보낼 때, Body부분에 데이터를 여러 부분으로 나눠서 보내는 방식이다.

HTML의 폼에서는 옵션으로 **멀티파트 폼 형식**이라는 인코딩 타입을 선택할 수 있다.

```HTML
<form method="POST" entype="multipart/form-data">
  	<input type="file" />
</form>
```

### Multipart/form-data 방식은 왜 생긴 것일까 ??

다음 예시를 보자

사진을 업로드 할때, 사진을 담은 `input`과 사진 설명을 담은 `input` 2개가 Body로 들어간다고 해보자.
사진의 `Content-type`은 `image/jpeg`일 것이고 사진 설명의 `Content-type`은 `application/x-www-form-urlencoded`가 될 것이다.
두 종류의 데이터가 하나의 `HTTP Request Body`에 들어가야 하는데, 한 `Body`에서 이 2종류의 데이터를 구분해서 넣지 못하기 떄문에 2종류 이상의 데이터를 넣기 위해 `Multipart/form-data` 방식이 생기게 된 것이다.

### Multipart/form-data를 수동으로 구성하는 방법

헤더에 `Content-Type: multipart/form-data`으로 콘텐츠 타입을 준 뒤에 경계 문자열을 준다.
경계 문자열은 각 브라우저가 독자적인 포맷으로 랜덤하게 만들어낸다.
`Content-type: multipart/form-data; boundary=——WebKitFormBoundary....`

각각의 파트에는 헤더가 들어가고 `Content-Disposition: form-data; name=" ... "` 과 같은 폼 필드의 정보를 추가해준다.

모든 파트가 끝나면 경계 문자열 뒤에 --를 추가해준다.

```
------WebKitFormBoundaryt0Yasdasd
Content-Disposition: form-data; name="movie"

Avengers
------WebKitFormBoundaryt0Yasd23
Content-Disposition: form-data; name="IronMan"

Thor
------WebKitFormBoundaryt0Yasd42d--
```
