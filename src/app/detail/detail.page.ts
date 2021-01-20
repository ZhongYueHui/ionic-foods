import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
export interface newsSlot {
  id: string,
  title: string,
  author: string,
  body: string,
  common?: any
}
export interface commonSlot {
  author: string,
  info: string,
  phone: string | number,
  isShow?: boolean,
  id: number,
  timestamp: number
}
export interface showToart {
  message: string,
  position?: string,
  mode?: string,
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark",
  duration?: number
}
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @ViewChild(IonContent, { static: true }) ion: IonContent
  news: newsSlot
  commones: string
  id: string
  userUid: string = ''
  authorUid: string = ''
  // 评论列表
  common = []
  // 节点
  commonRef: firebase.default.database.Reference
  pageKey = []
  limit = 0 // 查询起点
  offset = 10 // 查询条数
  isLoading = true
  unCommon = false
  constructor(
    private actRoute: ActivatedRoute,
    private afd: AngularFireDatabase,
    private toastController: ToastController,
    private location: Location,
  ) {
    this.userUid = localStorage.getItem('uid')
    this.actRoute.queryParams.subscribe(params => {
      // 获取文章id
      this.id = params['newsId']
      this.getNews()
    })
  }

  ngOnInit() {

  }
  // 获取资讯详情
  getNews() {
    this.afd.database.ref(`/post/news/${this.id}`).once('value', com => {
      this.news = com.val()
      // 获取文章作者
      this.authorUid = com.val().authorUid
      // 获取评论
      this.getNewsCommon()
    })
  }
  /**
   * 获取评论
   */
  getNewsCommon() {
    this.commonRef = this.afd.database.ref(`/post/common/${this.id}`)
    // 获取评论的key
    this.commonRef.get().then(e => {
      e.forEach(item => {
        this.pageKey.push(item.key)
      })
      // 如果没有评论数据
      if(this.pageKey.length == 0) {
        this.unCommon = true
        this.isLoading = false
        return
      }
      this.newsCommonPagination()
    })

  }
  /**
   * 数据分页
   */
  newsCommonPagination() {
    const limit = this.limit
    const offset = this.offset
    this.isLoading = true
    this.commonRef.
      orderByKey().
      startAt(this.pageKey[limit])
      .limitToFirst(offset)
      .once("value", com => {
        const commons = com.val()
        this.isLoading = false
        // 对象转换成数组
        for (const key in commons) {
          if (Object.prototype.hasOwnProperty.call(commons, key)) {
            const element = commons[key];
            element['key'] = key
            this.common.push(element)
          }
        }
      })
  }
  /**
   * 查看更多评论
   */
  showMore() {
    this.limit += this.offset
    this.newsCommonPagination()
  }

  // 提交评论
  async postCommon() {
    const timestamp = new Date().getTime()
    const commons: commonSlot = {
      author: this.userUid,
      phone: new Date().getDate().toString().slice(0, 12),
      info: this.commones ? this.commones : "xixiixixixiix",
      isShow: true,
      id: timestamp + Math.round(100),
      timestamp: timestamp
    }
    const dataRef = this.afd.database.ref(`post/common/${this.id}`).push()
    await dataRef.set(commons).then(e => {
      this.addCommon({
        key: dataRef.key,
        value: commons
      })
      this.showToast({
        message: "评论提交成功～",
        color: "success"
      })
      this.commones = ''
      this.toBottom()
    })
  }
  /**
   * 添加评论
   */
  addCommon(options: {key: string,value: object}){
    this.pageKey.push(options.key) // 添加到评论key数组
    this.common.push(options.value) // 添加到数组数据
  }
  /**
   * 删除评论
   * @param index 评论数据index
   */
  async delectCommon(index) {
    const key = this.pageKey[index]
    await this.afd.database.ref(`post/common/${this.id}/${key}`).set(null).then(e => {
      this.delectLocationData(index)
      this.showToast({
        message: "删除成功~",
        color: "danger"
      })
    })
  }
  /**
   * 删除本地数据
   * @param index 数据索引
   */
  delectLocationData(index) {
    this.pageKey.splice(index, 1) // 评论key
    this.common.splice(index, 1) // 评论数据
  }
  // 删除文章
  async deleteNews() {
    await this.afd.database.ref(`post/news/${this.news.id}`).set(null)
    await this.showToast({
      message: "删除成功～",
      color: "danger"
    })
    this.location.back()
  }
  toBottom() {
    this.ion.scrollToBottom(0.8)
  }
  async showToast(options: showToart) {
    const toast = await this.toastController.create({
      message: options.message,
      position: options.position == "top" || options.position == "bottom" ? options.position : "middle",
      mode: options.mode == "ios" ? options.mode : "md",
      color: options.color ? options.color : "success",
      duration: options.duration ? options.duration : 2000
    })
    toast.present();
  }
  ngOnDestroy() {
    this.commonRef ? this.commonRef.off() : null
  }
}
