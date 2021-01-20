import { Component, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database'
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messageList: string[]
  private user = null
  private sendBtnShow = true
  private message: string
  private list = []
  RefDoc: AngularFirestoreCollection
  private uid: string
  private email: string
  private password: string
  private name: string
  private imageUrl = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2043354718,212192109&fm=26&gp=0.jpg?id=" + new Date().getDate()
  private newsList = []
  protected loading =  true
  @ViewChild(IonContent) ionconten: IonContent
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afsf: AngularFireStorage,
    private afd: AngularFireDatabase,
    private router: Router,
  ) {
    this.afAuth.signInAnonymously().then(user => {
      this.uid = user.user.uid
      localStorage.setItem("uid", this.uid)
      this.init()
    })
  }
  async init(event?) {
      this.afd.database.ref('post/news').once('value', news => {
        let arr = []
        news.forEach(item => {
          arr.push(item.val())
        })
        this.newsList = arr
        this.loading = false
        if(event) {
          event.target.complete()
        }
    })
  }
  // loadData(event) {
  //   this.init(event).then(
  //     e => this.ionconten.scrollToBottom(0.5)
  //   )
  // }
  doRefresh(event) {
    this.init(event)
  }
  toDetail(news) {
    this.router.navigate(['detail'], {
      queryParams: {
        newsId: news.id
      }
    })
  }
  // 写数据
  writeUserData() {
    const postRef = firebase.default.database().ref('post/' + this.uid)
    const uid = this.uid
    postRef.set({
      author: "李四",
      body: `习惯了家里的锅碗瓢盆、油盐酱醋，也许是春天增强胃动力的人参叶，也许是仲夏口舌生香的石螺，也许是深秋醇香浓郁的酿豆腐，也许是寒冬酣畅淋漓的酸酒鸭，还有很多童年的、曾经的味道。这是来自家的浓情和爱意，是非比寻常的滋味。当这一切充盈心胃的时候，作为家庭的一份子，我能找到一份心灵的平静，在某个角落里慢慢咀嚼，轻轻回味静谧美好的岁月。
      回望过去，我看过很多好书，读过很多美文。在看过的这些书中，尤爱有关美食的美文。
      写美食，很容易落人口实，有炫耀之嫌。但汪曾祺先生写美食，平淡中充满了力量的智慧光芒。他真心爱生活，真情过日子，是润物细无声的那种爱和情，看似像房前屋后的溪流一样平静，却又是律动的，温馨、隽永、唯美、崇尚自然，又有绵延悠长的神韵。
      汪老先生写美食的美文，都是日常小菜，经他的妙笔，不但没有了油腻的柴火味，还成了诱人的美文，特别有味道。品读他的文字就像在审美，会觉得连纸张的味道都变得清香。在《家常酒菜》中，写了六道凉拌菜、四道热菜。他把老家江苏高邮拌枸杞头拌荠菜的方法，用来拌菠菜，十几道工序娓娓道来，写得生动有趣又井然有序，几乎可以当作菜谱。粗粗浏览一遍，就已食欲蠢蠢，垂涎欲滴。还有《故乡的食物》、《故乡的元宵》、《故乡的野菜》、《鱼我所欲也》、《萝卜》、《豆腐》、《蚕豆》等等，这些，都已成为我深深的记忆，就像镌刻在脑海中儿时吃过的美食。`,
      common: {}
    })
  }

}
