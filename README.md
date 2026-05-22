Tính năng dự kiến phát triển trong tương lai
1. Điểm số và chuỗi đúng

Thêm hệ thống điểm để học sinh thấy tiến độ trong phiên luyện tập.

Ví dụ:

Điểm: 8
Chuỗi đúng: 3

Tính năng này giúp trò chơi có cảm giác tiến bộ rõ ràng hơn.

2. Phiên luyện tập 10 câu

Thay vì luyện vô hạn, ứng dụng có thể chia thành từng phiên học ngắn.

Ví dụ:

Câu 1 / 10
Câu 2 / 10
...
Câu 10 / 10

Sau khi hoàn thành, hệ thống hiển thị kết quả tổng kết.

3. Màn hình tổng kết cuối phiên

Sau mỗi phiên luyện tập, ứng dụng có thể hiển thị:

Số câu đúng
Số câu sai
Chuỗi đúng cao nhất
Lỗi thường gặp
Gợi ý luyện tập tiếp theo

Ví dụ:

Bạn làm đúng 8/10 câu.
Bạn thường sai nhóm ch/tr.
Gợi ý: luyện thêm các từ bắt đầu bằng ch và tr.
4. Theo dõi lỗi sai trong phiên học

Không cần đăng nhập hoặc lưu database. Ứng dụng có thể dùng state trong React để ghi nhận lỗi sai trong phiên hiện tại.

Ví dụ:

{
  "ch_tr": 3,
  "s_x": 1,
  "tone": 2
}

Khi học sinh reload trang, dữ liệu sẽ reset.

5. Luyện tập thích ứng trong phiên

Dựa trên lỗi sai hiện tại, ứng dụng có thể ưu tiên đưa ra các từ thuộc nhóm học sinh đang yếu.

Ví dụ:

Sai ch/tr nhiều lần
→ hệ thống tăng tần suất từ: chó, chim, chạy, chân, trâu

Đây là hướng phát triển quan trọng giúp sản phẩm khác biệt so với một trò chơi trắc nghiệm thông thường.

6. Chọn chủ đề luyện tập

Vì dữ liệu đã có category, ứng dụng có thể cho học sinh chọn chủ đề:

Động vật
Gia đình
Cơ thể
Trường học
Hành động
Tính chất

Ví dụ:

Chủ đề: Động vật
Từ luyện: chó, mèo, gà, cá, vịt
7. Chọn độ khó

Vì dữ liệu đã có difficulty, ứng dụng có thể chia bài luyện thành các mức:

Dễ
Trung bình
Khó

Điều này giúp giáo viên hoặc phụ huynh điều chỉnh bài học phù hợp với trình độ của học sinh.

8. Âm thanh phát âm

Ứng dụng có thể thêm nút nghe phát âm cho từng từ.

Ví dụ:

[Nghe từ] chó

Tính năng này giúp học sinh kết hợp luyện đọc và luyện chính tả.

9. Hình ảnh minh họa

Mỗi từ có thể được bổ sung hình ảnh minh họa.

Ví dụ:

chó → hình con chó
mèo → hình con mèo
sách → hình quyển sách

Điều này giúp học sinh lớp 1 dễ liên tưởng từ với nghĩa.

10. Kết nối Google Sheets

Trong giai đoạn sau, dữ liệu từ vựng có thể được chuyển từ JSON sang Google Sheets.

Lợi ích:

Giáo viên dễ thêm từ mới.
Không cần sửa code khi cập nhật dữ liệu.
Có thể quản lý từ vựng theo chủ đề.
Có thể mở rộng để lưu kết quả luyện tập.
Hướng phát triển dài hạn

Dự án có thể mở rộng thành một nền tảng luyện chính tả nhỏ dành cho học sinh tiểu học, gồm:

Luyện phụ âm đầu
Luyện vần
Luyện dấu thanh
Luyện các cặp âm dễ nhầm
Bài luyện theo chủ đề
Bài luyện theo độ khó
Thống kê lỗi sai
Gợi ý bài học phù hợp
Trạng thái hiện tại

Project hiện đang ở mức MVP.

Đã hoàn thành:

Giao diện luyện chính tả cơ bản
Chế độ tách từ
Chế độ xây từ
Sinh lựa chọn tự động
Kiểm tra đáp án
Gợi ý khi sai
Dữ liệu từ vựng dạng JSON
Deploy được trên Vercel

Chưa hoàn thành:

Lưu kết quả học tập
Đăng nhập người dùng
Quản lý lớp học
Âm thanh phát âm
Hình ảnh minh họa
Adaptive practice hoàn chỉnh
Ghi chú

Dự án hiện không yêu cầu đăng nhập hoặc lưu trữ dữ liệu người dùng. Điều này giúp sản phẩm đơn giản, dễ triển khai và phù hợp với giai đoạn thử nghiệm ban đầu.

Các tính năng nâng cao như phân tích lỗi sai, cá nhân hóa bài luyện và kết nối Google Sheets có thể được phát triển sau khi MVP ổn định.