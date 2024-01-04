
<H1> PERFORMACNE PROJECT </H1>


<H3> 구현하고자 하는 기능 및 프로젝트. </H3>

이용자가 원하는 공연을 예매할 수 있는 웹사이트 구현해보기.

- 공연은 / title, location, performanceTime, price등의 정보를 가지고 있어야 함.
- 유저는 공연을 등록할 수 있는 ADMIN과 일반 USER로 두개의 ROLE을 ENUM TYPE으로 가지고 있어야함.
- 사용자는 가입시 100만 포인트를 지급 받아야함.
- 사용자의 보유 포인트가 모자란느 경우 예매를 할 수 없어야 한다.

- 로그인 /  회원가입
- 프로필 확인(본인)
- 새 공연 등록
- 공연 목록보기 및 상세보기
- KEYWORD로 공연을 검색하기.
- 좌석을 지정하지 않은 채로 공연 예매하기
- 예매 확인하기.

<H3>개발기간</H3>
12/31 ~ 1/3

12/31 : PROJECT 파일 생성 및 MAIN.TS 및 APP.MODULE 세팅. / USER ENTITIY, CONTROLLER, SERVICE 구현 (로그인 / 회원가입 기능)
1/1 : PROJECT / PERFORMANCE 관련 서비스 추가. / PERFORMACE 폴더 이외 관계로 SCHEDULE ENTITY 및 MODULE 설정
1/2 : RESERVATION 관련 서비스 추가.
1/3 : TESTING 불필요한 주석처리 삭제.

<H3> 어려웠던 점.</H3>

NestJs및 TS에 익숙치 않아, 타입지정에 조금 어려움을 겪었다.
TYPE이 단순한 Number, String 등이 아닌 별도로 타입을 만들어 해당타입을 입력해주는 부분에서 헷갈리는 부분이 있었다.
(ex : perFormance : Performance 등.. 내가 타입지정을 할 때 헷갈리게 해둔 부분도 있다고 생각함.)

각각의 Resource의 .module파일에서 어떤 것에 import하는지, provider는 정확히 어떨 때 어떤 것을 기입해야하는지. 개념적인 이해가 가지 않는 부분이 있어 어려웠다.
AuthGuard, RoleGuard및 인증이나 인가에 대한 부분과 전략부분에서 상당한 시간을 소모하게 되었다. 어찌어찌 작동은 되게 만들었으나 이거다!하는 깨달은은 시기 상조였다.

관계에 대한 부분중 One To Many / Many To one 관계 설정시에 작성하는 코드등이 상당히 생경했다. 


<H3> 만든 이후 느낀 점</H3>

JS, nodeJs, express를 이용해 만들었을때는, 아무래도 조금더 코드가 겉보기에 단순화 되어보이며 조금은 자유롭게 개발을 진행했던 것 같은데. TS와 NESTJS는 사사건건
어떠한 TYPE이나 받아오는 IMPORT 및 EXPORT, INJECTABLE에 대한 이해도가 떨어져 코드 작성부터 어려운 점이 조금 있었다.
특히 기존에 공부해왔었던 3 layered architecture에 대한 부분으로 controller , service 작성시에는 조금은 수월한 점이 있었으나 TypeOrm의 사용으로 인하여
repostory가 없는점, 그것은  각각의 서비스나 다른 파일에서 @InjectRepository(Schedule) 등으로 작성하는데는 조금 생소했다.

어떤한 것들을 배워나갈때 상상속으로 밑그림을 그려놓고 로직이 구현이 되어야 하는데 NEST는 오히려 각을 잡아주니까 조금 더 어렵게 다가왔던 것으로 생각은 하고있다.
Cascade도 신선하게 내게는 다가왔다. 부모자식같은 관계에 생성시 자동생성이 되는 부분.


