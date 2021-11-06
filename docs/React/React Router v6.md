## React Router v6 정식 릴리즈

React Router v6가 정식으로 릴리즈 되었다. [공식문서](https://reactrouter.com/docs/en/v6/upgrading/v5)
그 동안 사용했던 React Router의 문법이 조금 바뀌었는데  
v5문법에 많이 익숙해서 그런지 v6문법과 v5문법이 많이 헷갈린다. ㅎㅎ..
그럼 어떤점이 바뀌었는지 한번 보자

## Switch가 사라지고, Routes 등장

- `Routes`는 기존 `Switch` 처럼 경로를 순서를 기준으로 선택하는 것이 아닌, 가장 일치하는 라우트를 기반으로 선택하게 된다.
- `Routes`로 기존 `Switch`의 기능을 대체 가능

**기존 코드**

```jsx
<Switch>
  <Route path="/" ..... />
</Switch>
```

**v6 코드**

```jsx
<Routes>
  <Route path="/" .....  />
</Routes>
```

## useHistory가 사라지고, useNavigate 등장

- useNavigate로 기존에 useHistory의 기능을 전부 대체 가능
- useHistory의 history는 객체였지만 useNavigate의 navigate는 함수다.

**기존 코드**

```jsx
const history = useHistory();

history.push('/');
history.goback();
history.go(-2);
history.push(`/user/${user._id}`);
```

**v6 코드**

```jsx
const navigate = useNavigate();

navigate('/');
navigate(-1);
navigate(-2);
navigate(`/user/${user._id}`);
```

## useRouteMatch가 사라짐 대신에 상대 경로를 쓸 수 있게 됨

- 상대 경로를 사용할 수 있게되면서 굳이 useRouteMatch를 쓸 필요가 없어짐.

**기존 코드**

```jsx
const match = useRouteMatch();
console.log(match); // { path: '/', url: '/', isExact: true, params: {} }
<Link to={match.url} />; // 현재 url 로 이동
<Link to={`${match.url}/about`}>; // 현재 url에 /about을 붙인곳으로 이동

<Route path={match.patch} exact />
<Route path={`${match.patch}/about`} />
```

**v6 코드**

```jsx
<Link to="" />; // 이렇게 입력시 현재 페이지로 이동
<Link to="about">; // 이렇게 입력시 현재 url에 /about을 붙인 곳으로 이동 *단 about앞에 /about을 붙이게되면 진짜 /about으로 이동되니 현재 기준으로 하려면 앞에 슬래쉬를 빼줘야함

<Route path="" exact />
<Route path="about" />
```

## Route에 children이나 component가 사라지고, 대신에 element 사용

**기존 코드**

```jsx
<Route path="/" exact component={HomePage} />
<Route path="/login" exact>
    <LoginPage />
</Route>
```

**v6 코드**

```jsx
<Route path="/" exact element={<HomePage />} />
<Route path="/login" exact element={<LoginPage />} />
```

## 기존 Route는 꼭 Switch 안에 없어도 됐지만, v6의 Route는 Routes의 직속 자식이어야 함

**기존 코드**

```jsx
<Route path="/" exact component={HomePage} />
<Route path="/login" exact>
    <LoginPage />
</Route>
```

**v6 코드**

```jsx
<Routes>
  <Route path="/" exact element={<HomePage />} />
  <Route path="/login" exact element={<LoginPage />} />
</Routes>
```

## Route에 exact Prop 사라짐(exact가 기본으로 되어있음)

**기존 코드**

```jsx
<Route path="/login" exact component={UsersPage} />
```

**v6 코드**

```jsx
<Route path="/login" element={<UsersPage />} />
```

## 서브 경로가 필요한 경우 path에 \* 사용

**기존 코드**

```jsx
<Route path="/users/:username" component={UsersPage} />
```

**v6 코드**

```jsx
<Route path="/users/:username/*" element={<UsersPage />} />
```

## Optional URL 파라미터 사라짐. 필요하면 Route 2개 만들어야 함

**기존 코드**

```jsx
<Route path="/optional/:value?" component={Optional} />
```

**v6 코드**

```jsx
<Route path="/optional/:value?" element={<Optional />} />
<Route path="/optional" element={<Optional />} />
```

## 서브 라우트를 구현하는 또 다른 방법 Outlet

**기존 코드**

```jsx title="App.js"
<Route path="/users/:username" component={UsersPage} />
```

```jsx title="UsersPage.js"
<Route path="/users/:username" component={UserMain} />
<Route path="/users/:username/about" component={About} />
```

**v6 코드**

```jsx title="App.js"
<Route path="/users/:username/*" element={<UsersPage />}>
  <Route path="" element={<UserMain />} />
  <Route path="about" element={<About />} />
</Route>
```

```jsx title="UsersPage.js"
<Outlet />
```

## NavLink에 activeStyle, activeClassName 사라짐

**기존 코드**

```jsx
<NavLink to="/messages" style={{ color: "blue"}} activeStyle={{ color: "green"}}>
    Messages
</NavLink>

<NavLink to="/messages" className="nav-link" activeClassName="activated">
    Messages
</NavLink>
```

**v6 코드**

```jsx
<NavLink to="/messages" style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}>
  Messages
</NavLink>

<NavLink to="/messages" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "") }>
    Messages
</NavLink>
```
