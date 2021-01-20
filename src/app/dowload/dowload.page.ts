import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ListResult } from '@angular/fire/storage/interfaces';
@Component({
  selector: 'app-dowload',
  templateUrl: './dowload.page.html',
  styleUrls: ['./dowload.page.scss'],
})
export class DowloadPage implements OnInit {
  files = []
  constructor(
    private afs: AngularFireStorage,
    private file: File
  ) { }

  ngOnInit() {
    this.getStorageUrl()
  }
  /**
   *
   *
   * @param {*} fileId 文件id，获取对应下载url
   * @memberof DowloadPage
   */
  dowloadFille(fileId) {
    const fileIndex = this.files.findIndex(item => item.id == fileId)
    const url = this.files[fileIndex].src
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function (event) {
      var blob = xhr.response;
    };
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('dowloading')
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  }


  //获取文件下载地址
  getStorageUrl(): void {
    const storageRef = this.afs.storage.ref('/freakyStorage')
    storageRef.listAll().then((files: ListResult) => {
      // 获取仓库每一项
      files.items.forEach((item, index) => {
        // 获取每一项的地址显示出来
        storageRef.child(item.name).getDownloadURL().then(e => {
          this.files.push({
            name: item.name,
            fullPath: item.fullPath,
            src: e,
            fileStatus: 0,
            id: index + 1
          })
          console.log(this.files)
        })
      })
    })
  }

}
