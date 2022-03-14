import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Switch, Image } from "react-native";
import { FontFamilies, FontSizes } from '../../../constants'
import { SvgXml } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateColorTheme } from '../../../redux/actions/color';
import { connect } from 'react-redux';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    
    this.themeChanging = false;
    this.state = {
      
      protectPrivacy: true,
      hidePhotos: false,

      darkTheme: this.props.isDark ? this.props.isDark : false,
      themeSwitch: false,
      data: [
        {
          id: 1,
          iconSVG: '<svg xmlns="http://www.w3.org/2000/svg" height="511pt" version="1.1" viewBox="-38 0 511 511.99956" width="511pt"><g id="surface1"><path d="M 413.476562 341.910156 C 399.714844 379.207031 378.902344 411.636719 351.609375 438.289062 C 320.542969 468.625 279.863281 492.730469 230.699219 509.925781 C 229.085938 510.488281 227.402344 510.949219 225.710938 511.289062 C 223.476562 511.730469 221.203125 511.96875 218.949219 512 L 218.507812 512 C 216.105469 512 213.691406 511.757812 211.296875 511.289062 C 209.605469 510.949219 207.945312 510.488281 206.339844 509.9375 C 157.117188 492.769531 116.386719 468.675781 85.289062 438.339844 C 57.984375 411.6875 37.175781 379.277344 23.433594 341.980469 C -1.554688 274.167969 -0.132812 199.464844 1.011719 139.433594 L 1.03125 138.511719 C 1.261719 133.554688 1.410156 128.347656 1.492188 122.597656 C 1.910156 94.367188 24.355469 71.011719 52.589844 69.4375 C 111.457031 66.152344 156.996094 46.953125 195.90625 9.027344 L 196.246094 8.714844 C 202.707031 2.789062 210.847656 -0.117188 218.949219 0.00390625 C 226.761719 0.105469 234.542969 3.007812 240.773438 8.714844 L 241.105469 9.027344 C 280.023438 46.953125 325.5625 66.152344 384.429688 69.4375 C 412.664062 71.011719 435.109375 94.367188 435.527344 122.597656 C 435.609375 128.386719 435.757812 133.585938 435.988281 138.511719 L 436 138.902344 C 437.140625 199.046875 438.554688 273.898438 413.476562 341.910156 Z M 413.476562 341.910156 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,86.666667%,50.196078%);fill-opacity:1;" /><path d="M 413.476562 341.910156 C 399.714844 379.207031 378.902344 411.636719 351.609375 438.289062 C 320.542969 468.625 279.863281 492.730469 230.699219 509.925781 C 229.085938 510.488281 227.402344 510.949219 225.710938 511.289062 C 223.476562 511.730469 221.203125 511.96875 218.949219 512 L 218.949219 0.00390625 C 226.761719 0.105469 234.542969 3.007812 240.773438 8.714844 L 241.105469 9.027344 C 280.023438 46.953125 325.5625 66.152344 384.429688 69.4375 C 412.664062 71.011719 435.109375 94.367188 435.527344 122.597656 C 435.609375 128.386719 435.757812 133.585938 435.988281 138.511719 L 436 138.902344 C 437.140625 199.046875 438.554688 273.898438 413.476562 341.910156 Z M 413.476562 341.910156 " style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,66.666667%,38.823529%);fill-opacity:1;" /><path d="M 346.101562 256 C 346.101562 326.207031 289.097656 383.355469 218.949219 383.605469 L 218.5 383.605469 C 148.144531 383.605469 90.894531 326.359375 90.894531 256 C 90.894531 185.644531 148.144531 128.398438 218.5 128.398438 L 218.949219 128.398438 C 289.097656 128.648438 346.101562 185.796875 346.101562 256 Z M 346.101562 256 " style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" /><path d="M 346.101562 256 C 346.101562 326.207031 289.097656 383.355469 218.949219 383.605469 L 218.949219 128.398438 C 289.097656 128.648438 346.101562 185.796875 346.101562 256 Z M 346.101562 256 " style=" stroke:none;fill-rule:nonzero;fill:rgb(88.235294%,92.156863%,94.117647%);fill-opacity:1;" /><path d="M 276.417969 237.625 L 218.949219 295.101562 L 206.53125 307.519531 C 203.597656 310.453125 199.75 311.917969 195.90625 311.917969 C 192.058594 311.917969 188.214844 310.453125 185.277344 307.519531 L 158.578125 280.808594 C 152.710938 274.941406 152.710938 265.4375 158.578125 259.566406 C 164.4375 253.699219 173.953125 253.699219 179.820312 259.566406 L 195.90625 275.652344 L 255.175781 216.382812 C 261.042969 210.511719 270.558594 210.511719 276.417969 216.382812 C 282.285156 222.25 282.285156 231.765625 276.417969 237.625 Z M 276.417969 237.625 " style=" stroke:none;fill-rule:nonzero;fill:rgb(70.588235%,82.352941%,84.313725%);fill-opacity:1;" /><path d="M 276.417969 237.625 L 218.949219 295.101562 L 218.949219 252.605469 L 255.175781 216.382812 C 261.042969 210.511719 270.558594 210.511719 276.417969 216.382812 C 282.285156 222.25 282.285156 231.765625 276.417969 237.625 Z M 276.417969 237.625 " style=" stroke:none;fill-rule:nonzero;fill:rgb(43.529412%,64.705882%,66.666667%);fill-opacity:1;" /></g></svg>',
          title: "Gizliliğimi Koru",
          content: "HARCA aktivitelerinde profil bilgilerinizin gizli tutulması için bu özelliği aktif etmeniz gerekir.",
        },
        {
          id: 2,
          iconSVG: '<svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" fill="#e04955" r="248.5"/><path d="m273.5 503.89c-5.78.41-11.62.61-17.5.61-137.24 0-248.5-111.26-248.5-248.5s111.26-248.5 248.5-248.5c5.88 0 11.72.2 17.5.61-129.07 8.98-231 116.53-231 247.89s101.93 238.91 231 247.89z" fill="#d80a61"/><ellipse cx="256" cy="256" fill="#fff5f4" rx="205.459" ry="205.459" transform="matrix(.707 -.707 .707 .707 -106.039 256)"/><path d="m145.72 401.28c35.61 35.61 81.15 55.39 127.78 59.34-58.28 4.94-118.28-14.84-162.78-59.34-80.11-80.11-80.11-210.45 0-290.56 44.5-44.5 104.5-64.28 162.78-59.34-46.63 3.95-92.17 23.73-127.78 59.34-80.11 80.11-80.11 210.45 0 290.56z" fill="#eee6e3"/><path d="m321.634 168.401h-131.268l16.613-49.967c1.277-3.842 4.871-6.435 8.92-6.435h80.202c4.049 0 7.643 2.592 8.92 6.435z" fill="#fed22b"/><path d="m407.7 177.7v167.71c0 5.12-4.15 9.26-9.25 9.26h-275.66c-10.21 0-18.49-8.28-18.49-18.49v-158.48c0-10.21 8.28-18.49 18.49-18.49h266.42c10.21 0 18.49 8.28 18.49 18.49z" fill="#fed22b"/><path d="m104.3 224.44h303.4v65h-303.4z" fill="#f0a70a"/><circle cx="256" cy="260.802" fill="#655e67" r="60.555"/><path d="m157.79 354.67h-35c-10.21 0-18.49-8.28-18.49-18.49v-158.48c0-10.21 8.28-18.49 18.49-18.49h35c-10.21 0-18.49 8.28-18.49 18.49v158.48c0 10.21 8.28 18.49 18.49 18.49z" fill="#fdc202"/><path d="m104.3 224.44h35v65h-35z" fill="#e38803"/><path d="m104.3 224.44h35v65h-35z" fill="#e38803"/><path d="m250.9 112c-4.05 0-7.64 2.59-8.92 6.43l-11.831 35.593c-2.853 8.584-10.883 14.377-19.929 14.377h-19.85l16.61-49.97c1.28-3.84 4.87-6.43 8.92-6.43z" fill="#fdc202"/><path d="m273.5 318.79c-5.54 1.67-11.42 2.57-17.5 2.57-33.44 0-60.55-27.11-60.55-60.56 0-33.44 27.11-60.55 60.55-60.55 6.08 0 11.96.9 17.5 2.57-24.91 7.5-43.05 30.62-43.05 57.98s18.14 50.49 43.05 57.99z" fill="#544f56"/><path d="m386.75 417.417-290.605-290.652 3.855-25.765 26.608-5.024 289.809 289.691.416 28.833z" fill="#e04955"/><path d="m256 0c-140.756 0-256 113.95-256 256 0 68.38 26.629 132.668 74.98 181.02 48.353 48.351 112.64 74.98 181.02 74.98 142.273 0 256-115.464 256-256 0-141.491-114.497-256-256-256zm-160.012 75.955c7.104 7.104 200.054 200.055 207.83 207.831-4.298 8.923-10.793 16.183-18.698 21.367-4.156-4.156-110.723-110.723-116.101-116.1-2.929-2.928-7.678-2.928-10.606 0-2.929 2.93-2.929 7.678 0 10.607l17.28 17.28h-63.893v-39.24c0-6.06 4.93-10.99 10.99-10.99h2.673l11.737 11.737c1.464 1.464 3.384 2.196 5.303 2.196s3.839-.732 5.303-2.196c2.929-2.93 2.929-7.678 0-10.607-8.094-8.094-63.324-63.324-71.852-71.852 6.283-7.062 12.973-13.751 20.034-20.033zm227.2 205.985-1.911-1.911c4.681-15.91 3.419-33.109-3.621-48.089h82.544v50zm77.012 15v48.47c0 .971-.785 1.76-1.75 1.76h-10.033l-50.229-50.229h62.012zm-92.169-80c-12.97-15.421-31.723-24.19-52.031-24.19-6.558 0-13.003.942-19.229 2.774l-28.814-28.814h110.752.02 70.481c6.06 0 10.99 4.931 10.99 10.99v39.24zm.605 50.449-59.225-59.225c34.473-4.266 63.473 24.87 59.225 59.225zm-104.819-115.679 10.278-30.909c.259-.778.984-1.301 1.805-1.301h80.2c.82 0 1.545.522 1.803 1.296l10.28 30.914zm-12.503 130.23h-79.514v-50h78.894l2.544 2.544c-6.162 14.739-7.111 31.533-1.924 47.456zm7.017 15c17.817 28.433 53.43 39.426 83.988 26.626l23.604 23.604h-183.133c-6.06 0-10.99-4.931-10.99-10.99v-39.24zm6.655-50.707 65.587 65.587c-39.833 11.39-77.013-25.548-65.587-65.587zm51.014 250.767c-132.888 0-241-108.112-241-241 0-55.956 19.172-107.517 51.288-148.466l19.931 19.931c-64.217 84.789-57.481 209.065 25.926 285.561 1.44 1.32 3.256 1.972 5.067 1.972 6.792 0 10.117-8.401 5.071-13.028-40.832-37.422-64.146-89.605-64.146-145.974 0-42.469 13.721-83.983 38.789-117.824l15.638 15.638c-9.26 3.98-15.763 13.189-15.763 23.89v158.48c0 14.331 11.659 25.99 25.99 25.99h198.133l52.905 52.905c-66.678 49.388-158.912 52.294-228.897 4.815-3.428-2.325-8.092-1.432-10.417 1.996s-1.432 8.092 1.996 10.417c76.376 51.816 176.584 47.582 248.026-6.521l19.931 19.931c-40.951 32.115-92.512 51.287-148.468 51.287zm160.013-60.955c-4.47-4.47-115.198-115.198-120.105-120.105 7.725-5.583 14.18-12.727 19.001-21.064 5.263 5.263 116.95 116.95 121.136 121.137-6.282 7.061-12.971 13.75-20.032 20.032zm9.769-51.51c54.099-71.437 58.34-171.641 6.522-248.026-2.327-3.428-6.99-4.32-10.418-1.996-3.428 2.326-4.321 6.99-1.996 10.418 47.412 69.885 44.644 162.123-4.815 228.897l-12.256-12.256c7.121-1.93 12.381-8.435 12.381-16.162v-167.71c0-14.331-11.659-25.99-25.99-25.99h-65.22l-11.855-35.651c-2.303-6.913-8.747-11.559-16.035-11.559h-80.2c-7.287 0-13.731 4.645-16.037 11.563l-10.619 31.934-51.072-51.072c79.505-58.892 193.835-50.958 263.798 25.356 1.479 1.613 3.502 2.432 5.53 2.432 6.474 0 9.947-7.747 5.526-12.568-76.326-83.234-200.583-90.284-285.561-25.927l-19.931-19.931c40.949-32.115 92.51-51.287 148.466-51.287 132.888 0 241 108.112 241 241 0 55.956-19.172 107.517-51.288 148.465z"/><path d="m371.415 183.814h-29.524c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h29.524c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z"/></svg>',
          title: "Fotoğraflarımı Gizle",
          content: "Profilinizi ziyaret eden kişilerin fotoğralarınızı görmesini istemiyorsanız aktif etmeniz gerekir."
        },
        {
          id: 3,
          isButton: true,
          iconSVG: '<?xml version="1.0" encoding="UTF-8"?><svg width="25px" height="30px" viewBox="0 0 25 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>2991241</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="SETTINGS" transform="translate(-28.000000, -422.000000)" fill-rule="nonzero"> <g id="Hide-Photos-Copy" transform="translate(15.000000, 391.809735)"> <g id="2991241" transform="translate(13.000000, 30.190265)"> <g id="Account_1_" fill="#4086F4"> <path d="M24.3750595,3.55072266 L12.7679167,0.0350976562 C12.6785119,-1.95156391e-16 12.5892857,-1.95156391e-16 12.5,-1.95156391e-16 C12.4107143,-1.95156391e-16 12.3214881,-1.95156391e-16 12.2320833,0.0350976562 L0.624940476,3.55072266 C0.25,3.67376953 -2.11471052e-15,4.00775391 -2.11471052e-15,4.39453125 L-2.11471052e-15,13.3007812 C-2.11471052e-15,26.1151758 12.1072024,29.9296289 12.2320833,29.9647852 C12.3214881,29.9824219 12.4107143,30 12.5,30 C12.5892857,30 12.6785119,29.9824219 12.7679167,29.9647852 C12.8927976,29.9296289 25,26.1151758 25,13.3007812 L25,4.39453125 C25,4.00775391 24.75,3.67376953 24.3750595,3.55072266 Z" id="Path"></path> </g> <path d="M25,4.39453125 L25,13.3007812 C25,26.1151758 12.4085095,29.9296289 12.2786333,29.9647852 C12.1856524,29.9824219 12.0928571,30 12,30 L12,0 C12.0928571,0 12.1856524,0 12.2786333,0.0350976562 L24.3500619,3.55072266 C24.74,3.67376953 25,4.00775391 25,4.39453125 Z" id="Path" fill="#4175DF"></path> <path d="M18.02908,20.9245907 C17.70742,20.7870317 17.5,20.4846506 17.5,20.1515564 L17.5,19.1341172 C17.5,18.4265252 15.08122,17.8780425 13,17.8780425 C10.91878,17.8780425 8.5,18.4265252 8.5,19.1341172 L8.5,20.1515564 C8.5,20.4846506 8.29258,20.7870317 7.97092,20.9245907 C7.64926,21.0621498 7.27132,21.0082461 7.00498,20.7887285 C5.09512,19.2028967 4,16.9053439 4,14.4843161 C4,9.806347 8.0377,6 13,6 C17.9623,6 22,9.806347 22,14.4843161 C22,16.9053439 20.90488,19.2028967 18.99502,20.7887285 C18.73114,21.0062664 18.35494,21.0633941 18.02908,20.9245907 L18.02908,20.9245907 Z" id="Path" fill="#4175DF"></path> <path d="M17.5,19.1341298 L17.5,20.15157 C17.5,20.4846646 17.70742,20.7870459 18.02908,20.9246051 C18.35494,21.0634086 18.73108,21.0062243 18.99502,20.7887428 C20.90488,19.2029094 22,16.9053544 22,14.4843242 C22,9.80635066 17.9623,6 13,6 L13,17.8780539 C15.08128,17.8780539 17.5,18.4265372 17.5,19.1341298 Z" id="Path" fill="#4254B6"></path> <path d="M12.5,16 C10.5696917,16 9,14.4303083 9,12.5 C9,10.5696917 10.5696917,9 12.5,9 C14.4303083,9 16,10.5696917 16,12.5 C16,14.4303083 14.4303083,16 12.5,16 Z" id="Path" fill="#FFF5F5"></path> <path d="M12.5,23 C10.1867429,23 7.98590476,22.20445 6.3029,20.7595333 C6.10975714,20.59375 6,20.3587833 6,20.112675 L6,19.0454083 C6,16.0854583 11.8344,16 12.5,16 C13.1656,16 19,16.0854583 19,19.0454083 L19,20.112675 C19,20.3587833 18.8903048,20.59375 18.6971,20.7595333 C17.0140952,22.20445 14.8132571,23 12.5,23 Z M18.0848952,20.1335083 L18.1141952,20.1335083 L18.0848952,20.1335083 Z" id="Shape" fill="#FFF5F5"></path> <g id="Group" transform="translate(13.000000, 9.000000)" fill="#E3E7EA"> <path d="M5.7204,11.7595333 C5.89868571,11.59375 6,11.3587833 6,11.112675 L6,10.0454083 C6,7.08545833 0.6144,7 0,7 L0,14 C2.13531429,14 4.16685714,13.20445 5.7204,11.7595333 L5.7204,11.7595333 Z" id="Path"></path> <path d="M3.42857143,3.5 C3.42857143,1.56969167 1.89091429,0 0,0 L0,7 C1.89091429,7 3.42857143,5.43030833 3.42857143,3.5 Z" id="Path"></path> </g> </g> </g> </g> </g></svg>',
          title: "Yedek Hesap Bağlama",
          navigate: "BackupAccount",
          content: "Uygulama içi aktiviteleri (beğenme, yorum yapma vs.) bu hesaptan yaparak asıl hesabınızı korumanızı sağlar.",
        },
        {
          id: 4,
          iconSVG: '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path style="fill:#FEA832;" d="M134.996,160.795c-24.813,0-44.999-20.186-44.999-44.999s20.186-44.999,44.999-44.999	s44.999,20.186,44.999,44.999S159.81,160.795,134.996,160.795z"/><g>	<path style="fill:#E5741A;" d="M449.989,340.791c-16.538,0-29.999-13.462-29.999-29.999c0-16.538,13.462-29.999,29.999-29.999		s29.999,13.462,29.999,29.999C479.988,327.329,466.527,340.791,449.989,340.791z"/>	<path style="fill:#E5741A;" d="M404.99,430.789h-15v-15c0-8.291-6.709-15-15-15c-8.291,0-15,6.709-15,15v15h-15		c-8.291,0-15,6.709-15,15c0,8.291,6.709,15,15,15h15v15c0,8.291,6.709,15,15,15c8.291,0,15-6.709,15-15v-15h15		c8.291,0,15-6.709,15-15C419.99,437.498,413.281,430.789,404.99,430.789z"/></g><path style="fill:#A24F3D;" d="M491.119,42.093c-13.577-13.577-32.456-21.849-51.759-20.79	c-19.516,1.273-37.758,10.608-49.851,25.667L233.021,236.552c-4.666,5.94-4.455,14.637,1.061,20.153l42.425,42.425	c5.516,5.516,14.212,5.727,20.152,1.06l189.582-156.488c15.061-12.093,24.395-30.335,25.667-49.851	C512.968,74.549,504.696,55.669,491.119,42.093z M449.331,105.094c-5.94,5.94-15.273,5.94-21.213,0s-5.94-15.273,0-21.213	c5.939-5.939,15.273-5.94,21.213,0C455.271,89.822,455.27,99.155,449.331,105.094z"/><path style="fill:#8B432D;" d="M491.119,42.093L449.33,83.881c5.94,5.94,5.939,15.274,0,21.213c-5.94,5.94-15.273,5.94-21.213,0	L255.294,277.918l21.213,21.213c5.516,5.516,14.212,5.727,20.152,1.06l189.582-156.488c15.061-12.093,24.395-30.335,25.667-49.851	C512.968,74.549,504.696,55.669,491.119,42.093z"/><path style="fill:#B35C4B;" d="M328.479,393.528l-41.365,1.06l-148.49-148.488l1.06-41.365	c29.062-19.303,68.729-16.122,94.397,9.546l84.851,84.851C344.6,324.798,347.781,364.464,328.479,393.528z"/><path style="fill:#A24F3D;" d="M328.479,393.528l-41.365,1.06l-74.244-74.244l63.639-63.638l42.425,42.425	C344.6,324.798,347.781,364.464,328.479,393.528z"/><path style="fill:#FEDB41;" d="M308.326,415.8l-53.032,53.032c-29.273,29.273-76.79,29.273-106.064,0l-0.212-0.212l-20.364-21.637	l-21.849-20.576l-21.425-21.426l-25.454-26.728l-16.759-15.485l-21.212-21.213c-29.273-29.273-29.273-76.79,0-106.064l21.212-21.212	c5.94-5.94,15.273-5.94,21.212,0c5.94,5.94,5.94,15.273,0,21.212c-5.939,5.939-5.94,15.273,0,21.213	c5.94,5.94,15.274,5.939,21.213,0l31.819-31.819c8.486-8.061,12.727-14.001,22.273-20.153l188.794,188.794	C322.115,402.861,316.175,407.527,308.326,415.8z"/><path style="fill:#FEA832;" d="M308.326,415.8l-53.032,53.032c-29.273,29.273-76.79,29.273-106.064,0l-0.212-0.212l-20.364-21.637	l-21.849-20.576l127.276-127.276l94.397,94.397C322.115,402.861,316.175,407.527,308.326,415.8z"/><path style="fill:#E5741A;" d="M191.656,426.407c-5.863-5.863-15.351-5.863-21.213,0c-17.546,17.546-46.092,17.546-63.638,0	l42.155,42.155c15.621-2.161,30.712-8.958,42.696-20.943C197.519,441.756,197.519,432.27,191.656,426.407z"/><path style="fill:#FEA832;" d="M128.018,362.768c-5.863-5.863-15.351-5.863-21.213,0c-17.546,17.546-46.092,17.546-63.639,0	l42.155,42.155c15.621-2.161,30.712-8.958,42.696-20.943C133.88,378.119,133.88,368.631,128.018,362.768z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>',
          title: "Koyu Tema",
          content: "Koyu ve Açık tema arasında geçiş yapabilirsiniz.",
        },
      ],
    };
  }

  async _storeThemeStatus() {
    await AsyncStorage.setItem('isDark', this.props.isDark ? 'false' : 'true')
  }

  _changeTheme = () => {
    this._storeThemeStatus()
    this.setState({
      themeChanging: !this.state.themeChanging,
      themeSwitch: !this.state.themeSwitch
    }, () => setTimeout(
      () => { 
        this.props.updateColorTheme(!this.props.isDark);
      }, 1000 ) 
    )
    
  }

  componentDidMount(){
    this.setState({
      themeSwitch: this.props.isDark
    });
  }

  componentDidUpdate(prevProps){
      if(prevProps.isDark !== this.props.isDark){ 
        this.setState({
          themeChanging: !this.state.themeChanging
        });
       }
  }

  renderItem = (item) => {
    return <TouchableOpacity navigation={this.props.navigation} onPress={() => this.props.navigation.navigate(item.navigate)}  disabled={!item.isButton} style={[styles.rowContainer,{backgroundColor:this.props.themeColors.screenBackground}]}>
    <View style={{flex:1, flexDirection:'row', borderRadius:15,
      backgroundColor:this.props.themeColors.screenBackground,
        shadowColor: this.props.themeColors.rowShadow,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .15,
        shadowRadius: 3}}>
        <LinearGradient
          // Background Linear Gradient
          colors={[this.props.themeColors.linearGradientDark, this.props.themeColors.linearGradientLight]}
          start={{ x: 0, y: .5 }}
          end={{ x: 1, y: .5 }}
          style={{
              opacity:.85,
              position:'absolute',
              top:0,
              left:0,
              bottom:0,
              right:0,
              borderRadius:10
          }}
      />
      <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:60, height:60, justifyContent:'center', alignItems:'center'}}>
          <View>
            <SvgXml xml={item.iconSVG} width='35' height='35'></SvgXml>
          </View>
        </View>
      </View>
      <View style={{flex:8, flexDirection:'column'}}>
        <View style={{flex:1, padding:2, minHeight:35, justifyContent:'flex-end', alignItems:'flex-start'}}>
          <Text style={{fontFamily:FontFamilies.settingsRowTitle, color:this.props.themeColors.settingsRowTitle, fontSize:FontSizes.settingsRowTitle}}>{item.title}</Text>
        </View>
        <View style={{flex:7, padding:2}}>
          <Text style={{fontFamily:FontFamilies.settingsRowContent, fontSize:FontSizes.settingsRowContent, lineHeight:17, color:this.props.themeColors.settingsRowDesc, paddingBottom:10}}>{item.content}</Text>
        </View>
      </View>
      <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:50, height:50, justifyContent:'center', alignItems:'center'}}>
        <>
        { item.isButton 
        ? <View>
            <SvgXml width='25' height='25' fill={this.props.themeColors.rowArrow} xml={'<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g>	<g>		<path d="M496.128,220.361l-160-144.032c-19.712-17.728-50.08-16.192-67.808,3.584c-17.728,19.68-16.128,50.048,3.584,67.776			l66.976,60.32H48c-26.528,0-48,21.472-48,48s21.472,48,48,48h290.944l-67.072,60.32c-19.712,17.76-21.312,48.096-3.584,67.776			c9.504,10.528,22.592,15.904,35.712,15.904c11.456,0,22.944-4.064,32.096-12.32l160-143.968			c10.112-9.088,15.904-22.08,15.904-35.68C512,242.441,506.208,229.449,496.128,220.361z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'}></SvgXml>
          </View>
        : <View>
          {
            {
              1: <Switch
                        trackColor={{false: this.props.themeColors.switchButtonPassive, true: this.props.themeColors.switchButtonActive}}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        onValueChange={(value) => {this.setState({protectPrivacy:value}); }}
                        value={this.state.protectPrivacy}
                      />,
              2: <Switch 
                        trackColor={{false: this.props.themeColors.switchButtonPassive, true: this.props.themeColors.switchButtonActive}}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        onValueChange={(value) => this.setState({hidePhotos:value})}
                        value={this.state.hidePhotos}
                      />,
              4: <Switch 
                        trackColor={{false: this.props.themeColors.switchButtonPassive, true: this.props.themeColors.switchButtonActive}}
                        thumbColor="white"
                        ios_backgroundColor="gray"
                        onValueChange={(value) => this._changeTheme() }
                        value={this.state.themeSwitch}
                      />
            }[item.id]
          }
          </View>
        }
        </>
        </View>
      </View>
    </View>
  </TouchableOpacity>;
  };

  _renderActionTypeModalContent = () => (
      <View style={{position:'absolute', top:0, right:0, left:0, bottom:0, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
        <View style={{width:'20%', borderRadius:100, aspectRatio:1, padding:0, backgroundColor:'rgba(255,255,255,.9)', justifyContent:'center', alignItems:'center',
        shadowColor: this.props.themeColors.rowShadow,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .35,
        shadowRadius: 8}}> 
          <Image source={{uri: 'https://webcomicms.net/sites/default/files/clipart/147280/cartoon-image-147280-218736.gif'}} style={{width:'130%', aspectRatio:1}} />
        </View>
      </View>
  )

  render() {
    return (

      <View style={{backgroundColor:this.props.themeColors.screenBackground, flex:1}}>
        <Modal isVisible={this.state.themeChanging} 
          animationOutTiming={500}
          useNativeDriver={true}
          style={{margin: 0}}
          backdropOpacity={0}
          useNativeDriver
          backdropColor={'white'}
          children={this._renderActionTypeModalContent()} />
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            numColumns={1}
            stickyHeaderIndices={[0]}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 75,
              paddingTop:5
            }}
          />
        
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColors: state.colorReducer.themeColors,
    isDark: state.colorReducer.isDark
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateColorTheme: (isDark) => dispatch(updateColorTheme(isDark))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
  rowContainer: {
    margin:5,
    marginVertical:2,
    padding:5,
    flex:1, flexDirection:'row',
    minHeight:100, borderRadius:15,
  }
})