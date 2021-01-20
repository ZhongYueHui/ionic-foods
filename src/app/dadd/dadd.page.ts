import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Location } from '@angular/common'
import { AngularFireStorage } from '@angular/fire/storage'
interface newsSlot {
  id: string,
  title: string,
  author: string,
  body: string,
  img: string,
  authorUid: string,
  timestamp: number
}
@Component({
  selector: 'app-dadd',
  templateUrl: './dadd.page.html',
  styleUrls: ['./dadd.page.scss'],
})
export class DaddPage implements OnInit {
  private title: string
  private body: string
  protected img: string
  private fileToUpload: File
  protected uploadProgress = 0
  private fileUrl: string
  protected uid: string
  @ViewChild('input', { static: true }) input: ElementRef
  constructor(
    private toastController: ToastController,
    private lcoation: Location,
    private afs: AngularFireStorage,
    protected platform: Platform
  ) {
    this.uid = localStorage.getItem("uid")
  }

  ngOnInit() {
  }
  selectFile() {
    // 触发input的点击事件
    this.input.nativeElement.click()
  }
  /**
   * 重新选择文件时清理之前的文件信息
   */
  clearOldFile() {
    this.fileToUpload = null
    this.fileUrl = null
    this.uploadProgress = 0
  }
  /**
   * 选择上传文件
   * @param event 上传文件
   */
  uploadFile(event) {
    if (this.fileUrl) {
      this.clearOldFile()
    }
    if (event.target.files.length == 0) {
      throw new Error("please select file");
    }
    const file: File = event.target.files[0];
    this.fileToUpload = file;
    this.uploadFileToStorage()
  }
  /**
   * 上传至firebase
   */
  uploadFileToStorage() {
    // 选择上传节点
    const storageRef = this.afs.storage.ref("/news")
    // 添加文件标签
    const customMetadata = { time: new Date().getTime() + '', size: this.fileToUpload.size + '', type: this.fileToUpload.type, oldName: this.fileToUpload.name }
    // 获取文件后缀
    const ext = this.fileToUpload.name.split(',')[this.fileToUpload.name.split(',').length - 1]
    // 文件命名以及上传
    const uploadTask = storageRef.child(`${this.fileToUpload.name}_${new Date().getTime()}.${ext}`).put(this.fileToUpload, { customMetadata })
    // 监听文件上传状态
    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED, snapshot => {
      // 计算除上传进度 = 上传字节/文件总字节
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // 上传进度
      this.uploadProgress = progress / 100
      console.log('Upload is ' + progress + '% done');
      // 获取文件状态
      console.log('当前状态', snapshot.state)
      switch (snapshot.state) {
        case firebase.default.storage.TaskState.PAUSED: // 暂停
          console.log('Upload is paused');
          break;
        case firebase.default.storage.TaskState.RUNNING: // 上传中
          console.log('Upload is running');
          break;
        case firebase.default.storage.TaskState.CANCELED: // 取消
          console.log('Upload is cancel');
          break;
      }
    }, (error) => {
      // 上传失败
      switch (error.code) {
        // 没有权限
        case 'storage/unauthorized':
          break;
        // 取消上传
        case 'storage/canceled':
          // User canceled the upload
          break;
        // 未知错误
        case 'storage/unknown':
          break;
      }
    }, () => {
      // 上传成功
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.fileUrl = downloadURL
      });
    })
  }
  // 添加文章
  postNews() {
    const timestamp= new Date().getTime()
    const id = `${this.uid}_${timestamp}`
    const news: newsSlot = {
      id: id, // 标示文章id
      authorUid: this.uid,// 标示文章作者uid
      title: this.title,
      author: "zxx",
      img: this.fileUrl,
      body: this.body,
      timestamp: timestamp
    }
    // 提交文章到实时数据库
    firebase.default.database().ref(`/post/news/${id}`).set(news).then(e => {
      this.showToast()
      this.lcoation.back()
    })
  }
  async showToast() {
    const toast = await this.toastController.create({
      message: "发布成功",
      position: "middle",
      mode: "ios",
      color: "success",
      duration: 2000
    })
    toast.present();
  }

}
