export class NguoiDung{
    TaiKhoan: string;
    MatKhau: string;
    Email: string;
    SoDT: string;
    MaNhom: string;
    MaLoaiNguoiDung: string;
    HoTen: string;

    constructor(taikhoan:string,matkhau:string,email:string,sodt:string,maNhom:string,maLoaiNguoiDung:string,hoTen:string){
        this.TaiKhoan = taikhoan;
        this.MatKhau = matkhau;
        this.Email = email;
        this.SoDT = sodt;
        this.MaNhom = maNhom;
        this.MaLoaiNguoiDung = maLoaiNguoiDung;
        this.HoTen = hoTen;
    }
}

