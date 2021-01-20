import {  Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import * as firebase from 'firebase';
import { from, observable, Observable, Subject, Subscription } from 'rxjs';
import { UploadTask } from '@angular/fire/storage/interfaces';

interface User {
  name: string,
  age: number
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fileToUpload: File = null;
  user$: Observable<Object>;
  avatarURL;
  UploadedFileURL: any
  users$ : Observable<object>
  uploadProgress = 0
  uploadRef: UploadTask
  constructor(
    private http: HttpClient,
    private afs: AngularFireStorage
  ) {
   
  }
  ngOnInit(){}

  attachFile(e) {
    if (e.target.files.length == 0) {
      console.log("No file selected!");
      return
    }
    let file: File = e.target.files[0];
    this.fileToUpload = file;
  }

  uploadAvatar(f) {
    // 使用put

    // // 获取文件后缀名
    // const ext = this.fileToUpload.name.split('.')[this.fileToUpload.name.split('.').length - 1]
    // // 获取数据类型和文件后缀 ["image","png"] 不适合用于apk等文件，但是可以获取文件类型
    // const fileType = this.fileToUpload.type.split('/')
    // // 获取上传节点
    // const storageRef = this.afs.storage.ref()
    // // 文件描述
    // const customMetadata = { app: 'Freaky Image Upload Demo' };
    // // 添加到指定节点指定文件名并上传
    // const uploadTask = 
    // storageRef.child(`${fileType[0]}s/${fileType[0]}_${new Date().getTime()}.${ext}`)
    // .put(this.fileToUpload, {
    //   customMetadata
    // })
    // // 监听获取文件状态
    // uploadTask.on('state_changed', (snapshot) => {
    //   // 计算除上传进度 = 上传字节/文件总字节
    //   const  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   // 上传进度
    //   this.uploadProgress = progress / 100
    //   console.log('Upload is ' + progress + '% done');
    //   // 获取文件状态
    //   switch (snapshot.state) {
    //     case firebase.default.storage.TaskState.PAUSED: // 暂停
    //       console.log('Upload is paused');
    //       break;
    //     case firebase.default.storage.TaskState.RUNNING: // 上传中
    //       console.log('Upload is running');
    //       break;
    //   }
    // }, (error) => {
    //   // 上传失败
    //   switch (error.code) {
    //     // 没有权限
    //     case 'storage/unauthorized':
    //       break;
    //   // 取消上传
    //     case 'storage/canceled':
    //       // User canceled the upload
    //       break;
    //     // 未知错误
    //     case 'storage/unknown':
    //       break;
    //   }
    // }, () => {
    //   // 上传成功
    //   uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //     this.avatarURL = downloadURL
    //   });
    // });



    // 使用upload
    const customMetadata = { app: 'Freaky Image Upload Demo' };
    const path = `freakyStorage/${new Date().getTime()}_${this.fileToUpload.name}`;
    const uploadRef = this.afs.upload(path, this.fileToUpload, { customMetadata }).task
    this.uploadRef = uploadRef
    uploadRef.on(firebase.default.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        // 计算除上传进度 = 上传字节/文件总字节
        const  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // 上传进度
        this.uploadProgress = progress / 100
        console.log('Upload is ' + progress + '% done');
        // 获取文件状态
        console.log('当前状态',snapshot.state)
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
        uploadRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.avatarURL = downloadURL
        });
      });
  }
  uploadPause(){
    this.uploadRef.pause() // 暂停
  }
  uploadResume(){
    this.uploadRef.resume() // 恢复
  }
  uploadCancel(){
    this.uploadRef.cancel() // 取消
  }
}
