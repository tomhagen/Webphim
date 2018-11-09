import '../../assets/css/index.css';
import { PhimService } from '../services/phimSV';
import { Phim } from '../models/phim';
import { NguoiDung } from '../models/nguoidung';
import { NguoiDungService } from '../services/nguoidungSV';

// Khởi tạo instance từ lớp PhimService
const phimSV = new PhimService();

const nguoiDungSV = new NguoiDungService();
window.onload = function(){
    phimSV.layDanhSachPhim()
    .done(function(res){
        danhSachPhim = res;
        renderMovieItem();
    }).fail(function(error){
        console.log(error);
    })
}
let danhSachPhim:Phim[] = [];
let danhSachGioHang:Phim[] = [];

// có 2 cách khai báo kiểu dữ liệu: 1 là: Mảng[] và 2 là array<Phim>
// con trỏ this bị đổi ngữ cảnh trong arrow function
let renderMovieItem = () => {
    let content: string = '';
    for(let movie of danhSachPhim ){
        // kỹ thuật bóc tách thuộc tính từ mảng ( Destructuring, khai báo sẵn để ở dưới data dùng lại-{khỏi cần ghi movie.MaPhim}
        let{MaPhim,TenPhim,Trailer,HinhAnh,MoTa,MaNhom,NgayKhoiChieu,DanhGia} = movie
        content += `
        <div class="col-sm-6 col-md-3 text-center">
        <div class="movie__item">
            <img src="${movie.HinhAnh}" onerror="this.onerror===null;this.src='https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'" style="height:350px" class="img-fluid w-100">
            <div class="movie__overlay"></div>
            <div class="movie__detail w-100 text-center text-white">
                <i class="fa fa-play d-block mx-auto mb-3 video-playvenobox  vbox-item" href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                <p>
                    <a href="#" class="movie_icon"><i class="fa fa-file"></i></a>
                    <a 
                    data-maphim=${MaPhim}
                    data-tenphim=${TenPhim}
                    data-trailer=${Trailer}
                    data-hinhanh=${HinhAnh}
                    data-mota=${MoTa}
                    data-manhom=${MaNhom}
                    data-ngaychieu=${NgayKhoiChieu}
                    data-danhgia=${DanhGia}
                    
                    class="movie_icon btnAddToCart"><i class="fa fa-shopping-cart"></i></a>
                </p>
                <span>Released: ${movie.NgayKhoiChieu ? movie.NgayKhoiChieu.substr(0,10):'2018-20-10'}</span>
            </div>
        </div>
        <p class="movie__name text-center my-3"> ${movie.TenPhim}</p>
        ${renderStar(parseInt(movie.DanhGia))}
    </div>
        `
    }
    (<HTMLDivElement>document.getElementById('movieList')).innerHTML = content;
    themPhimVaoGioHang('btnAddToCart');
};
// dùng hàm onerror khi hình bị lỗi null thì nó sẽ đổi lại đường dẫn hình
// lưu ý: không dùng arrow function trong lớp đối tượng


// For in hay for of là dùng duyệt theo mảng, nhưng đây là duuyệt tới num nên dùng vòng for bình thường
let renderStar = (num:number) => {
    let stars =``;
    if(num){
        for(let i = 0; i < num; i++){
            stars += `
                <i class="fa fa-star movie__star"></i>  
            `
        }
        for(let k = 5; k > num; k-- ){
            stars += `
                <i class="fa fa-star-o movie__star"></i>  
            `
        }
        // nếu đánh giá được 3 sao thì chạy vòng lặp bên dưới để tạo thêm 2 ngôi sao rỗng
    }
    else{
        for(let i = 0; i < 5; i++){
            stars += `
            <i class="fa fa-star movie__star"></i>  
            `
        }
    }
    return stars;
    
}
// nếu num tồn tại thì chạy bình thường, còn num không tồn tại thì cho nó 5 sao luôn

let themPhimVaoGioHang = (btnClass) => {
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    // --> DOM tới tất cả những nút động
    for(let btn of btns){
        btn.addEventListener('click',() => {
           let maPhim = btn.getAttribute('data-maphim');
           let tenPhim = btn.getAttribute('data-tenphim');
           let trailer = btn.getAttribute('data-trailer');
           let hinhAnh = btn.getAttribute('data-hinhanh');
           let moTa = btn.getAttribute('data-mota');
           let maNhom = btn.getAttribute('data-manhom');
           let ngayChieu = btn.getAttribute('data-ngaychieu');
           let danhGia = btn.getAttribute('data-danhgia');
        
           let PhimItem = new Phim(maPhim,tenPhim,trailer,hinhAnh,moTa,maNhom,ngayChieu,danhGia);
           console.log(PhimItem);

           // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa?
           let index = timPhimTheoMa(PhimItem.MaPhim);
           if(index === -1){
               danhSachGioHang = [...danhSachGioHang,PhimItem];
           }
           // Spread operator, thêm PhimItem vào trong danhSachGioHang
        //    danhSachGioHang = [...danhSachGioHang,PhimItem]
           localStorage.setItem('cartList',JSON.stringify(danhSachGioHang));
           // do local chỉ nhận chuỗi thôi nên phải nén nó lại
           (<HTMLSpanElement>document.getElementById('totalAmount')).innerHTML = danhSachGioHang.length.toString();
        })
    }
}   

let timPhimTheoMa = (maPhim:string) => {
    for(let movie of danhSachGioHang){
        if(movie.MaPhim === maPhim){
            return 1;
        }
    }
    return -1;
}

let DangKy = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatKhau')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('HoTen')).value;
    let email = (<HTMLInputElement>document.getElementById('Email')).value;
    let sodt = (<HTMLInputElement>document.getElementById('SoDT')).value;
    let maNhom = 'GP01';
    let maLoaiNguoiDung = 'KhachHang';

    const NguoiDungDK = new NguoiDung(taiKhoan,matKhau,email,sodt,maNhom,maLoaiNguoiDung,hoTen);
    console.log(NguoiDungDK);

    let ajaxDangKy = nguoiDungSV.DangKy(NguoiDungDK);
    ajaxDangKy.done(function(result){
        console.log(result);
        if(typeof(result) !== 'string'){
            alert('success');
        }
    }).fail(function(error){
        console.log(error);
    })
    // ajaxDangKy.done( result => {
    //     console.log(result);
    // }).fail( error => {
    //     console.log(error);
    // })
}


(<HTMLButtonElement>document.getElementById('btnDangKy')).addEventListener('click',DangKy);

let DangNhap = () => {
    let taiKhoan = (<HTMLInputElement>document.getElementById('txtTaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('txtMatKhau')).value;

    nguoiDungSV.DangNhap(taiKhoan,matKhau).done(result => {
        if(typeof(result) !== 'string'){
            (<HTMLInputElement>document.getElementById('btnClose')).click()
            localStorage.setItem('userInfo',JSON.stringify(result));
        }
    }).fail(error => {
        console.log(error);
    })


}

(<HTMLButtonElement>document.getElementById('btnDangNhap')).addEventListener('click',DangNhap)

let getUser = () => {
    let LocalUser = JSON.parse(localStorage.getItem('userInfo'));
    if(LocalUser){
        (<HTMLSpanElement>document.getElementById('userInfo')).style.display = 'inline';
        (<HTMLSpanElement>document.getElementById('userName')).innerHTML = LocalUser.taiKhoan;
    }
}