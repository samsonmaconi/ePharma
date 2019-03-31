import { Component, OnInit } from '@angular/core';
import { MyLiveChat_OnInit } from './livechatOnInit.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  hccid = 34923858; // My LiveChat ID of my account. This ID was assigned when my account was created.
  chatInitScript = document.createElement('script');
  mainChatScript = document.createElement('script');
  lastScriptOnPage = document.getElementsByTagName('script')[
    document.getElementsByTagName('script').length - 1
  ];

  constructor() {
    this.embedChat();
  }

  ngOnInit() {}

  embedChat() {
    // inserts chat oninit function from './livechatOnInit.js' into script tag
    this.chatInitScript.innerHTML = MyLiveChat_OnInit;

    this.mainChatScript.async = true;
    this.mainChatScript.src =
      'https://mylivechat.com/chatinline.aspx?hccid=' + this.hccid;

    this.lastScriptOnPage.parentNode.append(this.chatInitScript);
    this.lastScriptOnPage.parentNode.append(this.mainChatScript);
  }
}
