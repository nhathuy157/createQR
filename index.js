const banks_data = [
    {
        LABEL: "Thiên Trang",
        STK: "1043111111",
        CTK: "CONG TY TNHH DONG PHUC THIEN TRANG",
        BANK: "Vietcombank - Ngân hàng TMCP Ngoại Thương Việt Nam - 970436",
        LOGO_IMG: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/Group1196.png",
        LOGO_TEXT: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/TT.png",
        FRAME: ""
    },
    {
        LABEL: "247",
        STK: "118833333",
        CTK: "PHAN THỊ HẠNH",
        BANK: "VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng - 970432",
        LOGO_IMG: "",
        LOGO_TEXT: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/AoThun247.jpg",
        FRAME: ""
    },
    {
        LABEL: "Bảo Thiên Phước",
        STK: "123868988888",
        CTK: "Cty TNHH Bảo Thiên Phước",
        BANK: "ACB - Ngân hàng TMCP Á Châu - 970416",
        LOGO_IMG: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/LOGODPBTP-02.png",
        LOGO_TEXT: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/LOGODPBTP1-02.png",
        FRAME: ""
    },
    {
        LABEL: "Hạnh - TT",
        STK: "8386777777",
        CTK: "PHAN THI HANH",
        BANK: "VCB - Ngân hàng TMCP Ngoại Thương Việt Nam - 970436",
        LOGO_IMG: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/Group1196.png",
        LOGO_TEXT: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/TT.png",
        FRAME: ""
    },
    {
        LABEL: "Hạnh - BTP",
        STK: "3383777777",
        CTK: "PHAN THI HANH",
        BANK: "VCB - Ngân hàng TMCP Ngoại Thương Việt Nam - 970436",
        LOGO_IMG: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/LOGODPBTP-02.png",
        LOGO_TEXT: "https://raw.githubusercontent.com/nhathuy157/Img-Extension/main/LOGODPBTP1-02.png",
        FRAME: ""
    }
];

// Định nghĩa class Bank để chứa thông tin tài khoản ngân hàng
class Bank {
    BANK_INFO; ACCOUNT_NO; AMOUNT; ACCOUNT_NAME; updateAt;
    constructor(BANK_INFO, ACCOUNT_NO, AMOUNT, ACCOUNT_NAME) {
        this.BANK_INFO = BANK_INFO;
        this.ACCOUNT_NO = ACCOUNT_NO;
        this.AMOUNT = AMOUNT;
        this.ACCOUNT_NAME = ACCOUNT_NAME;
    }
}

var bank_save = []; // Mảng lưu thông tin các tài khoản ngân hàng
var formatCurrentcy = amount => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

(function () {
    // Lấy danh sách ngân hàng từ API vietqr.io
    fetch('https://api.vietqr.io/v2/banks')
        .then(r => r.json())
        .then(r => {
            const eles = r.data.map(bank => `<option value="${bank.short_name} - ${bank.name} - ${bank.bin}">`).join('');
            document.getElementById('bank').innerHTML = eles;
        })
        .catch(err => { /* Nếu có lỗi thì bỏ qua */ });

    // Đổ dữ liệu từ mảng banks_data vào datalist cho thương hiệu ngân hàng
    bank_template.innerHTML += banks_data.map(bank => `<option value="${bank.LABEL}">`).join('');

    // Khi người dùng chọn một thương hiệu ngân hàng từ danh sách
    bank_select.addEventListener('change', function () {
        const bank = banks_data.find(b => b.LABEL == this.value); 
        if (bank) {
            banks.disabled = true;
            ACCOUNT_NO.disabled = true;
            ACCOUNT_NAME.disabled = true;
            banks.value = bank.BANK;
            ACCOUNT_NO.value = bank.STK;
            ACCOUNT_NAME.value = bank.CTK;
        } else {
            banks.disabled = false;
            ACCOUNT_NO.disabled = false;
            ACCOUNT_NAME.disabled = false;
        }
        // Lưu lựa chọn ngân hàng vào localStorage
        localStorage.setItem("select_bank", this.value);
    });

    // Lấy ngân hàng đã chọn trước đó từ localStorage và hiển thị lại
    const selectedBank = localStorage.getItem("select_bank");
    if (selectedBank) {
        bank_select.value = selectedBank;
        bank_select.dispatchEvent(new Event('change')); // Kích hoạt sự kiện 'change' để cập nhật giao diện
    }

    // Khi người dùng click vào trường chọn ngân hàng
    bank_select.addEventListener('click', function () {
        bank_select.value = ''; 
    });

    // Khi người dùng nhập số tiền
    AMOUNT.addEventListener('keyup', function () {
        textAmount.innerText = this.value.length > 0 ? formatCurrentcy(parseInt(this.value)) : '';
    });

    // Lấy số tài khoản gần đây nhất đã lưu từ localStorage
    var bank;
    const bankData = JSON.parse(localStorage.getItem('data_banks'));
    if (bankData && bankData.length > 0) {
        bank_save = bankData;
        bank = bankData.sort((a, b) => b.updateAt - a.updateAt)[0];
        banks.value = bank.BANK_INFO;
        ACCOUNT_NO.value = bank.ACCOUNT_NO;
        ACCOUNT_NAME.value = bank.ACCOUNT_NAME;
    }
      // Tạo phần "Nội dung" ngẫu nhiên
      const descriptionPrefixInput = document.getElementById('DESCRIPTION_PREFIX');
      const descriptionSuffixInput = document.getElementById('DESCRIPTION_SUFFIX');
  
      // Lấy giá trị tiền tố từ localStorage
      const savedPrefix = localStorage.getItem('description_prefix');
      if (savedPrefix) {
          descriptionPrefixInput.value = savedPrefix;
      }
  
      // Khi người dùng nhập tiền tố, lưu vào localStorage
      descriptionPrefixInput.addEventListener('input', function () {
          localStorage.setItem('description_prefix', this.value);
      });
  
      // Tạo giá trị ngẫu nhiên cho hậu tố
      const timestamp = Date.now();
      descriptionSuffixInput.value = timestamp;

    // Khi người dùng nhấn nút 'Tạo và copy QR'
    document.getElementById('btnCreateQr').addEventListener('click', async function () {
        try {
            const found = bank_save.find(b => b.ACCOUNT_NO == ACCOUNT_NO.value);
            if (found) {
                bank_save.map(b => {
                    if (b.ACCOUNT_NO == ACCOUNT_NO.value) b.updateAt = Date.now();
                    return b;
                });
                localStorage.setItem("data_banks", JSON.stringify(bank_save));
            } else {
                bank_save.push({
                    BANK_INFO: banks.value,
                    ACCOUNT_NO: ACCOUNT_NO.value,
                    ACCOUNT_NAME: ACCOUNT_NAME.value,
                    updateAt: Date.now() 
                });
                localStorage.setItem("data_banks", JSON.stringify(bank_save));
            }

            document.getElementById('status').innerText = "";
            document.getElementById('status').style.color = "#fff";

            const bank_id = banks.value.split(' - ')[2]; 
            const src_template = `https://img.vietqr.io/image/${bank_id}-${ACCOUNT_NO.value}-print.png?amount=${AMOUNT.value}&addInfo=${descriptionPrefixInput.value + " "+ descriptionSuffixInput.value}&accountName=${ACCOUNT_NAME.value}`;
            document.getElementById('imageQR').src = src_template;
            im_show.src = imageQR.src;

            imageQR.crossOrigin = "anonymous"; 
            imageQR.onload = async function () {
                try {
                    imageQR.style.display = "block"; 
                    const canvas = document.createElement("canvas"); 
                    canvas.width = imageQR.width;
                    canvas.height = imageQR.height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(imageQR, 0, 0, imageQR.width, imageQR.height); 

                    const found_bank = banks_data.find(b => b.STK == ACCOUNT_NO.value);
                    if (found_bank) {
                        const logo_img = document.createElement('img');
                        const logo_text = document.createElement('img');
                        const logo_frame = document.createElement('img');
                        [logo_img, logo_text, logo_frame].forEach(img => { img.crossOrigin = "anonymous"; });

                        if (found_bank.LOGO_IMG) logo_img.src = found_bank.LOGO_IMG;
                        if (found_bank.LOGO_TEXT) logo_text.src = found_bank.LOGO_TEXT;
                        if (found_bank.FRAME) logo_frame.src = found_bank.FRAME;

                        let imagesToLoad = [logo_img, logo_text, logo_frame].filter(img => img.src);
                        let countLoad = 0;
                        imagesToLoad.forEach(img => {
                            img.onload = function () { countLoad++; };
                        });

                        while (countLoad < imagesToLoad.length) {
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }

                        if (logo_text.src) {
                            let height = 190;
                            let width = Math.round(logo_text.width * height / logo_text.height);
                            if (width > 620) {
                                width = 620; height = Math.round(logo_text.height * width / logo_text.width);
                            }
                            const x = Math.round((canvas.width - width) / 2);
                            const y = Math.round((190 - height) / 2);
                            ctx.fillStyle = "white"; ctx.fillRect(0, 0, 1000, 190); 
                            ctx.drawImage(logo_text, x, y, width, height); 
                        }

                        if (logo_img.src && logo_img.width === logo_img.height && logo_img.width > 0) {
                            ctx.fillStyle = "white"; ctx.fillRect(460, 460, 85, 85); 
                            ctx.drawImage(logo_img, 455, 455, 95, 95); 
                        }

                        if (logo_frame.src) {
                            ctx.drawImage(logo_frame, 0, 0, canvas.width, canvas.height);
                        }

                        canvas.toBlob(async (blob) => {
                            // Kiểm tra nếu đang sử dụng PC/laptop hay mobile (gồm cả iPhone/iPad)
                            const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
                            // Nếu là PC/laptop -> chỉ copy
                            if (!isMobile) {
                                try {
                                    if (navigator.clipboard && window.ClipboardItem) {
                                        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
                                        document.getElementById('status').innerText = "QR đã được copy!";
                                        document.getElementById('status').style.color = "#28a745";
                                    } else {
                                        throw new Error("Clipboard API không được hỗ trợ.");
                                    }
                                } catch (copyError) {
                                    document.getElementById('status').innerText = "Lỗi copy QR: " + copyError.message;
                                    document.getElementById('status').style.color = "#ff0000";
                                }
                            } 
                            
                            // Nếu là mobile (bao gồm iPhone/iPad) -> vừa copy vừa tải về
                            if (isMobile || !navigator.clipboard) {
                                const downloadLink = document.createElement('a');
                                downloadLink.href = URL.createObjectURL(blob);
                                downloadLink.download = 'qr_code.png'; // Tên file khi tải về
                                downloadLink.click(); // Kích hoạt tải về máy
        
                                document.getElementById('status').innerText += " Ảnh đã được tải về.";
                            }
                        }, "image/png");
                    }
                } catch (error) {
                    document.getElementById('status').innerText = "Lỗi copy QR: " + error.message;
                    document.getElementById('status').style.color = "#ee0000";
                } finally {
                    imageQR.style.display = "none";
                }
            }
        } catch (err) {
            document.getElementById('status').innerText = "Lỗi: " + err.message;
            document.getElementById('status').style.color = "red";
        }
    });
})();

