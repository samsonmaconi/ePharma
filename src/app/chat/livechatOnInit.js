export function MyLiveChat_OnInit() {
  MyLiveChat_SetUserName(localStorage.getItem('firstname'));
  MyLiveChat_SetEmail(localStorage.getItem('email'));
}
