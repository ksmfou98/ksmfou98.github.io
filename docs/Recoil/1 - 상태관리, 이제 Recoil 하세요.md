본 내용은 [FEConf 2021 리코일](https://www.youtube.com/watch?v=0-UaleJZOw8&t=347s) 영상을 정리한 내용입니다.
더 자세한 내용을 보기 위해서는 영상을 시청해주세요!

## 상태관리 라이브러리에 대한 고민

우리는 라이브러리를 고를 때 다음과 같은 고민들을 한다.

- 🤩 **새로운 기술을 도입할 수 있는 절호의 기회**
- 😂 **무조건 빠르게 개발해야 한다.**
- 🤔 **최대한 네이티브 앱스럽게(?) 만들자**
- 😨 **갑자기 라이브러리 운영이 중단된다면?**
- 😱 **서비스가 폭발적으로 성장할 것만 같은 착각**
- 😎 **그리고 힙해야 한다.**

리액트의 핵심이라고 할 수 있는 상태관리는 최근에 여러 기술이 나오면서 다양한 선택지가 생겼음에도 불구하고 이런 핵심기술을 메인서비스에 도입하기가 쉽지않다. 오늘은 이런 다양한 상태관리 도구 중에서 **Recoil**을 살펴보려고 한다.

## 너도 나도 쓰는 Redux

현재 프론트엔드 상태관리 라이브러리에서 가장 많이 사용되고 있는 것은 **Redux**이다. **Redux**는 단방향으로만 처리되던 React의 단점을 혁신적으로 변화 시켰던 매우 유용한 라이브러리 이지만 간단한 상태를 만들기 위해서도 많은 코드가 작성되어야 한다는 단점이 있다. 그래서 프론트 엔드 개발환경에서 이렇게 까지 거창한 코드를 만들어야 하나? 하는 생각이 들곤한다.

## 이제는 Redux만이 답이 아니다.

기존에는 여러 사람들이 사용하니깐 당연히 Redux를 사용해왔었다. 하지만 지금은 Redux말고도 여러가지 상태관리 도구들이 나왔고, 그 중에서 React를 만든 페이스북에서 Recoil이라는 상태관리 도구도 만들었다. 더 이상 Redux를 고집할 필요가 없어졌다.

| 패턴         | 종류                 |                                      |
| ------------ | -------------------- | ------------------------------------ |
| Flux         | **Redux**, Zustand   | 익숙하지만 여전히 번거롭다..         |
| Proxy        | **MobX**, Valtio     | 쉽지만 리액트답지 못하달까..         |
| Context      | **Context API**      | 복잡성이 커지면 Context 분리 어려움  |
| Server Cache | **React-query**, SWR | 이것 만으로는 부족하지..             |
| Atomic       | **Recoil**, Jotai    | **페이스북이 만들었다고? 간결하다!** |

## Recoil의 핵심 컨셉

Recoil의 핵심 컨셉은 다음과 같다.

- 오직 React만을 위해서 React 처럼 만들어졌다.
- React 내부 상태만 활용한다.
- 아주 작은 **Atom** 단위로 관리가 된다.
- Selector 라는 **순수 함수**를 제공한다.
- 상태가 변경되면 그 Atom을 참조하는 컴포넌트만 **리랜더링**된다.
- 데이터 흐름에 따라서 여러 상태에 연관된 컴포넌트들을 유기적으로 관리할 수 있다.
- React를 개발한 facebook에서 만들었기 때문에 장기적인 관점에서 React와 Recoil의 호환성과 성능의 이점을 기대해 볼 수 있다.

## 코드로 보는 Recoil 활용기

### atom

기본적인 `atom` 생성 방법은 아래와 같다.

```javascript
import { atom } from 'recoil';

export const countState = atom({
    key: 'countState', // 고유 key 설정
    default 0 // 초기 값 설정
})
```

### useRecoilState

해당 `atom`을 `useState` hooks 처럼 호출해서 사용할 수 있다.

```jsx
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  return (
    <div>
      <p>{countState}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### useRecoilValue, useSetRecoilState

해당 `atom`은 `읽기 전용`과 `쓰기 전용`으로도 호출할 수 있다.

```jsx
function Counter() {
  const count = useRecoilValue(countState);
  const setCount = useSetRecoilState(countState);
  return (
    <div>
      <p>{countState}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### useResetRecoilState

`atom`의 상태를 초기화 해주는 `useResetRecoilState` hooks도 제공하고 있다.

```jsx
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  const resetCount = useResetRecoilState(countState);
  return (
    <div>
      <p>{countState}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => resetCount()}>count 초기화</button>
    </div>
  );
}
```

### selector

`getter`와 `setter`를 직접 설정해서 상태를 관리할 수 있는 `selector`라는 **순수함수**도 제공한다. 여기서 `getter` 를 설정하면 `useRecoilValue` 또는 `useRecoilState`의 배열 첫번째로 값을 가져올 수 있고, `setter`를 설정하면 `useSetRecoilState` 또는 `useRecoilState`의 배열 두번째로 값을 설정할 수 있다.

`selector`의 기본 options는 다음과 같다.

```typescript
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})
```

`selector`는 `getter`를 필수로 가져야 하고, `setter`는 선택적으로 가질 수 있다. 그리고 이 `selector` 내부에서 다른 `atom`이나 다른 `selector`를 참조할 수 있다. Recoil에서는 이를 **구독** 하고 있다고 부른다.

`selector`로 **상품의 정보를 필터링하는 코드**를 보면 다음과 같다. `products`라는 상품 리스트와 `filter`라는 필터링 타입의 상태를 받아와서 `filter`의 값이 변경될 때마다 그에 맞는 `products`를 반환하는 코드이다.

```javascript
export const filteredProductsState = selector({
  key: 'filteredProductsState',
  get: ({ get }) => {
    const products = get(productsState);
    const filter = get(filterState);
    return products.filter((product) => product.name.includes(filter));
  },
});
```

## 비동기 데이터 다루기

`selector`에서 비동기 데이터를 가져오는 경우는 다음과 같다. get에서 비동기처리로 api를 호출하는 모습이다.

```javascript
const productsAsyncState = selector({
  key: 'productsAsyncState',
  get: async ({ get }) => {
    return await getProductsAPI();
  },
});
```
