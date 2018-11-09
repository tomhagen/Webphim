import $ from 'jquery';
declare let $: any;

export class PhimService{
    layDanhSachPhim(){
        return $.ajax({
            type: 'GET',
            url: 'http://sv2.myclass.vn/api/QuanLyPhim/LayDanhSachPhim?MaNhom=GP01',
            
        })
    }
}