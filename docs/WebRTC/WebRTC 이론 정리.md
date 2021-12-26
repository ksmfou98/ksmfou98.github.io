## WebRTC란 ?

**WebRTC(Web Real-Time Communications)**란, 웹 또는 앱(Android, IOS)에서 별도의 소프트웨어, 플러그인 없이 음성, 영상, 텍스트 같은 데이터를 브라우저끼리 주고 받을 수 있게 해주는 기술이다.  
[MDN의 WebRTC 문서](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API)에서는 WebRTC를 다음과 같이 정의하고 있다.

> WebRTC(Web Real-Time Communications)은 웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림 할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술입니다.

WebRTC에 사용되는 기술은 크게 3가지의 클래스에 의해서 실시간 데이터 교환이 일어난다

- **MediaStream**: 카메라와 마이크 등의 데이터 스트림 접근
- **RTCPeerConnection**: 암호화 및 대역폭 관리 및 오디오, 비디오 연결
- **RTCDataChannel**: 일반적인 데이터의 P2P 통신

이 3가지의 객체를 통해서 데이터 교환이 이뤄지며 **RTCPeerConnection** 들이 적절하게 데이터를 교환할 수 있게 처리해 주는 과정을 **시그널링(Signaling)**이라고 한다.

**PeerConection**은 두 명의 유저가 스트림을 주고 받는 것이므로 연결을 요청하는 **콜러(Caller)**와 연결을 받는 **콜리(Callee)**가 존재한다. 콜러(Caller)와 콜리(Callee)가 통신을 하기 위해서는 중간 역할을 해주는 서버가 필요하고, 서버를 통해서 **SessionDescription**을 서로 주고 받아야 한다.

### RTCPeerConnection을 통해 사용자간의 어떠한 방식으로 통신이 되는 것인가 ?

아래는 유명한 엘리스와 이브의 이야기를 가지고 잘 설명한 글이다.

> 엘리스가 **RTCPeerConnection** 객체를 생성합니다.  
> 엘리스가 **createOffer** 메소드를 사용하여 **제안(SDP Session Description Protocol)**을 생성합니다.  
> 엘리스가 제안과 함께 **setLocalDescription을** 호출합니다.  
> 엘리스는 제안을 문자열화하고, 시그널링 메커니즘을 이용하여 이브에게 보냅니다.  
> 이브는 엘리스의 제안을 가지고 **setRemoteDescription**을 호출하였으므로 그녀의 **RTCPeerConnection**이 엘리스의 설정을 알게됩니다.  
> 이브는 **createAnswer**을 호출하고 이에 대해 **로컬 세션 정보(Local Session Description Protocal)**, 즉 이브의 응답을 인자로 전달하는 성공 콜백 함수를 호출합니다.  
> 이브는 **setLocalDescription**의 호출을 통해 그녀의 응답을 **로컬 기술(Description)**로 설정합니다.  
> 그리고 나서 이브는 시그널링 메커니즘을 사용하여 그녀의 문자열화된 응답을 엘리스에게 다시 전송합니다.  
> 엘리스는 **setRemoteDescription**을 사용하여 이브의 응답을 **원격 세션 기술(Description)**으로 설정합니다.

출처: https://withseungryu.tistory.com/129

### P2P 절차 요약

1. 각 브라우저가 P2P 커뮤니케이션에 동의
2. 서로의 주소를 공유
3. 보안 사항 및 방화벽 우회
4. 멀티미디어 데이터를 실시간으로 교환

## 시그널링 (Signaling)

P2P 통신을 위해서는 두 기기가 서로 연결되어 있어야 한다. 그런데 두 기기를 연결하기 위해서는 서로 간의 IP 정보 등을 알아야 한다. 그래서 두 기기를 연결하기 위해서 시그널링 과정이 필요하다.

시그널링 과정은 아래의 단계로 진행된다.

1. 각 peer(사용자)는 webRTC session의 종단을 나타내기 위해 RTCPeerConnection 객체를 생성한다.
2. 각 peer는 ice candidate 이벤트를 처리하기 위한 핸들러를 설정하고 시그널링 채널을 통해 candidate들을 발신한다.
3. 각 peer는 이벤트를 처리하기 위한 핸들러를 설정한다. 이는 remote peer가 stream에 track을 추가할 때 이를 수신하여 처리하기 위한 것이다. 이 때, `<video>` element등을 사용하여 수신자에게 track을 연결한다.
4. 발신자(caller)는 서로를 식별할 수 있도록 고유 식별자(unique identifier) 또는 토큰을 생성하고 수신 peer와 공유한다.
5. 각 peer는 시그널링 서버(WebSocket 등 미리 합의 프로토콜을 생성해둔 서버)에 접속하여 메세지를 교환한다.
6. 각 peer는 4단계에서 생성한 토큰 등의 정보와 함께 WebRTC session에 참여하기 원한다는 신호를 보낸다.

## WebRTC 장/단점

### 장점

- **대기시간이 짧다.**  
  인스타 라이브, 유튜브 스트리밍, 트위치 방송, 아프리카 방송과 같은 플랫폼들은 **RTMP(Real Time Message Protocol)**를 사용한다. **RTMP** 같은 경우는 어느정도 대기시간이 있는 반면, WebRTC는 대기시간이 거의 없는 Real Time과 비슷하다.
- **별 다른 소프트웨어, 플러그인이 필요 없다.**  
  별도의 소프트웨어, 플러그인을 설치할 필요 없이 웹 브라우저에서 바로 사용할 수 있다.
- **개발하는데 있어서 진입장벽이 낮다.**  
  현재 자료도 많이 나와있고, javascript를 이용해서 사용법도 어렵지 않다.
- **무료이다.**

### 단점

- **크로스 브라우징 문제**  
  WebRTC는 Chrome, Opera, FireFox, Android, IOS 등 다양한 브라우저, 앱에서 사용할 수 있는데, 그렇다고 모든 브라우저에서 다 가능한건 아니다. 잘 사용되지 않는 브라우저에서는 WebRTC를 사용할 수 없다.
- **STUN/TURN 서버 필요**  
  Peer to Peer 통신을 하기 위해서는 사용자의 IP주소를 알아야한다. 하지만 실제 개개인의 컴퓨터는 방화벽 등 여러가지 보호장치들이 존재해서 Peer들 간의 연결이 쉽지않다. 이렇게 서로간의 연결을 위한 정보를 공유하여 P2P 통신을 가능하게 해주는 STUN/TURN 서버가 필요하다.

## WebRTC 용어 정리

WebRTC를 처음 공부하게 될 때 용어 때문에 많이 어렵다고 느껴진다. 그래서 내가 이해하기 힘들었던 용어들을 정리해 보려고 한다.

### STUN(Session Traversal Utilities for NAT)

- STUN 서버는 각 Client의 NAT 통과 전후의 IP를 기록하여 상대방 Client에 이 정보를 전달해 주며 이를 통해 P2P 연결을 성립시킨다.
- 클라이언트 자신의 Public Address(IP:PORT)를 알려준다.
- peer간의 직접 연결을 막는 등의 라우터의 제한을 결정하는 프로토콜 (현재 다른 peer가 접근 가능한지 여부 결정)
- 클라이언트는 인터넷을 통해 클라이언트의 Public Address와 라우터의 NAT 뒤에 있는 클라이언트가 접근 가능한지에 대한 답변을 STUN서버에 요청한다.

### NAT(Network Address Translation)

- 단말에 공개 IP(Public IP) 주소를 할당하기 위해 사용한다.
- 라우터는 공개 IP 주소를 갖고 있고 모든 단말들은 라우터에 연결되어 있으며 비공개 IP주소 (Private IP Address)를 갖는다.
- 요청은 단말의 비공개 주소로부터 라우터의 공개 주소와 유일한 포트를 기반으로 번역한다. 이 덕분에, 각각의 단말이 유일한 공개 IP 없이 인터넷 상에서 검색 가능하다.
- 몇몇의 라우터들은 Symmetric NAT이라고 불리우는 제한을 위한 NAT을 채용한다. 즉, peer들이 오직 이전에 연결한 적 있는 연결들만 허용한다. 따라서 STUN 서버에 의해 공개 IP 주소를 발견한다고 해도 모두가 연결을 할 수 있다는 것은 아니다. (위의 설명에서 STUN 서버에 다른 peer가 접근 가능한지 여부를 요청하는 이유)
- 이를 위해 TURN이 필요하다

### TURN

TURN 서버는 STUN 서버를 이용한 연결이 실패하였을 경우 사용된다. 공인 IP로 돌아가는 TURN 서버를 이용하여 각 Client가 보내주는 데이터를 다른 Client로 보내는 작업을 실시하여 P2P 연결을 성립시킨다.

### SDP

각 Peer에서 송수신 되는 멀티미디어 컨텐츠 규격(해상도, 포멧, 코덱, 압축 등)의 표준으로 SDP를 이용하여 서로의 컨텐츠의 정보를 이해할 수 있다. (SDP는 컨텐츠 데이터가 아니라 컨텐츠의 메타데이터 라는 점)

### Signaling

서로 다른 네트워크에 있는 Client들은 서로를 연결하기 위해서 각 Client의 위치와 미디어 포맷 협의가 필요하다. 이러한 프로세스를 Signaling이라고 하며 Signaling을 위해서는 Signailing 서버가 필요하다.

### Signaling 서버

두 Client 사이에서 서로의 Signaling 정보를 전달 할 수 있는 서버가 필요하며 어떠한 통신 방법이든 상관없다. 또한 Signaling에서 사용되는 협의 메세지인 SDP의 내용도 몰라도 된다. 그냥 Signaling 서버는 Client에서 오는 정보를 다른 Client로 전달하는 역할만 수행하면 된다.

### ICE(Interactive Connectivity Establishment)

- 브라우저가 peer를 통한 연결이 가능하도록 해주는 프레임 워크이다.
- peer간 단순 연결 시 작동하지 않는 이유들
  - 연결을 시도하는 방화벽을 통과해야 함
  - 단말에 Public IP가 없다면 유일한 주소값을 할당해야 한다.
  - 라우터가 peer간의 직접 연결을 허용하지 않을 때 데이터를 릴레이 해야 하는 경우
- ICE는 위의 작업들을 수행하기 위해 STUN과 TURN 서버 둘 다 혹은 하나의 서버를 사용한다.

### ICE candidate

Signaling을 이용하여 SDP를 결정한 후에 ICE candidate(후보)들을 교환하기 시작한다. ICE candidate는 발신 Client에서 통신을 어떻게 하는지의 방법을 설명하며 통신 방법이 검색되는 순서대로 ICE candidate를 보낸다. 이미 ICE를 정해 미디어 스트리밍을 시작 했더라도 가능한 모든 ICE candidate를 전송하여 최고의 ICE를 결정한다. (이 때문에 초반에 영상의 품질이 낮을 수 있다)
