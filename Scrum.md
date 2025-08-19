 **Tài liệu dự án**

**A.Tổng quan**

**I. Quản lý người dùng và vai trò**

**1\. Đăng ký tài khoản**

* Người dùng mới có thể đăng ký tài khoản bằng:

  * Email

  * Mật khẩu

  * Họ tên, số điện thoại (…)

* Gửi email xác thực (verify email) sau khi đăng ký.

**2\. Đăng nhập**

* Đăng nhập bằng email và mật khẩu.

* Hệ thống hỗ trợ ghi nhớ đăng nhập

* Kiểm tra thông tin và hiển thị lỗi nếu sai email hoặc mật khẩu.

**3\. Xác thực 2 lớp (Two-Factor Authentication \- 2FA) (Tuỳ chọn bật/tắt)**

* Sau khi đăng nhập, nếu bật 2FA, người dùng sẽ:

  * Nhận mã OTP qua email hoặc ứng dụng Authenticator (Google Authenticator/Authy).

  * Nhập mã OTP để hoàn tất đăng nhập.

**4\. Quản lý hồ sơ người dùng**

* Xem và chỉnh sửa thông tin cá nhân: tên, ảnh đại diện, số điện thoại,…

* Đổi mật khẩu.

* Bật/tắt 2FA.

**5\. Đăng nhập SSO**

* Cho phép đăng nhập bằng tài khoản google, github

* Tạo tài khoản tương ứng với account đăng nhập bên thứ 3

**II. Quản lý dự án**

**1\. Tạo dự án mới**

* Trường thông tin khi tạo dự án bao gồm:

  * Tên dự án (bắt buộc)

  * Mô tả dự án (tuỳ chọn)

  * Ngày bắt đầu (start date)

  * Ngày kết thúc dự kiến (end date)

  * Trạng thái (đang hoạt động / đã hoàn thành / đã hủy / Chưa bắt đầu)

* Người tạo mặc định sẽ là **Product Owner** 

**2\. Chỉnh sửa dự án**

* Cho phép cập nhật:

  * Tên dự án

  * Mô tả

  * Thời gian bắt đầu/kết thúc

  * Trạng thái dự án

* Chỉ người có vai trò **Product Owner** hoặc **Scrum Master** mới có quyền chỉnh sửa.

**3\. Xoá dự án**

* Chỉ Product Owner mới được phép xóa dự án.

* Hệ thống sẽ yêu cầu xác nhận trước khi xóa.

* Khi xóa:

  * Toàn bộ backlog, sprint, nhiệm vụ và lịch sử liên quan sẽ bị xóa hoặc lưu trữ theo cấu hình hệ thống.

**4\. Gán thành viên vào dự án**

* Cho phép thêm người dùng vào dự án bằng:

  * Email với tất cả người dùng

* Khi thêm, hệ thống yêu cầu gán **vai trò cụ thể** cho từng người:

  * Product Owner

  * Scrum Master

  * Developer

  * Viewer/Stakeholder

* Người dùng được thêm sẽ có quyền truy cập dự án và thực hiện chức năng theo vai trò được gán.

**5\. Quản lý danh sách thành viên**

* Danh sách thành viên được hiển thị với:

  * Họ tên

  * Email

  * Vai trò

* Có thể:

  * Thay đổi vai trò

  * Xóa thành viên khỏi dự án

**6\. Xác định thời gian của dự án**

* Ngay khi tạo dự án, người dùng cần thiết lập:

  * Ngày bắt đầu (start date)

  * Ngày kết thúc (end date)

* Các chức năng khác (Sprint, Sprint Planning, Backlog,...) sẽ hoạt động trong giới hạn thời gian này.

* Hệ thống có thể:

  * Hiển thị cảnh báo nếu dự án đã hết hạn.

  * Tự động thay đổi trạng thái dự án thành **“Hoàn thành”** nếu đã qua ngày kết thúc và tất cả sprint đã kết thúc.

**III. Product Backlog**

**1\. Thêm User Story vào Product Backlog**

* Chức năng này thường dành cho **Product Owner**.

* Khi tạo mới một User Story, cần cung cấp các thông tin:

  * **Tiêu đề** (Title): Ngắn gọn, mô tả yêu cầu chính.

  * **Mô tả chi tiết** (Description): Trình bày rõ yêu cầu dưới dạng tiêu chuẩn Agile (As a \[role\], I want \[feature\], so that \[benefit\]).

  * **Độ ưu tiên** (Priority): Ví dụ: Cao, Trung bình, Thấp hoặc số thứ tự ưu tiên.

  * **Story Point**: Điểm ước lượng độ khó hoặc độ phức tạp (dựa trên Planning Poker hoặc Fibonacci).

* User Story sẽ được lưu trong Product Backlog của dự án tương ứng.

**2\. Chỉnh sửa User Story**

* Cho phép cập nhật các trường:

  * Tiêu đề

  * Mô tả

  * Ưu tiên

  * Story Point

* Chỉ **Product Owner** hoặc người được phân quyền mới có thể chỉnh sửa.

**3\. Xóa User Story**

* Cho phép xóa một hoặc nhiều User Story khỏi backlog.

* Hệ thống yêu cầu xác nhận trước khi xóa.

* Nếu User Story đã được gắn vào Sprint, cần kiểm tra và cảnh báo ảnh hưởng trước khi xóa.

![][image1]

**4\. Chức năng gán User Story vào Sprint**

* Sau khi PO hoàn thành việc mô tả và đánh giá User Story, có thể:

  * Gắn từng User Story vào Sprint phù hợp.

  * Kéo thả (drag & drop) từ Product Backlog sang Sprint 

  * Cảnh báo user story point nếu vượt ngưỡng cho phép của sprint

* Hệ thống sẽ kiểm tra:

  * Sprint đã kết thúc chưa.

  * Tổng Story Point của Sprint hiện tại để cân bằng khối lượng công việc.

**5\. Kiểm tra trạng thái User Story**

* Hiển thị trạng thái User Story theo các giai đoạn:

  * **Backlog** (chưa gán Sprint)

  * **Đang thực hiện** (đã gắn Sprint, đang xử lý)

  * **Hoàn thành** (đã hoàn thành trong Sprint)

**IV. Sprint Management**

**1\. Tạo Sprint**

Chức năng dành cho **Product Owner** hoặc **Scrum Master**.

**Thông tin cần nhập khi tạo Sprint:**

* **Tên Sprint**: Ví dụ: *Sprint 1*, *Sprint 2*, hoặc tùy chọn theo tính năng.

* **Thời gian bắt đầu**: Ngày chính thức bắt đầu Sprint.

* **Thời gian kết thúc**: Ngày Sprint kết thúc (thường từ 1–4 tuần).

* **Mục tiêu Sprint (Sprint Goal)**: Mô tả mục tiêu chính mà team cần đạt được trong Sprint này.

Chỉ một Sprint được active tại cùng một thời điểm trong mỗi dự án.

**2\. Lập kế hoạch Sprint (Sprint Planning)**

* Chức năng chọn User Story từ Product Backlog để đưa vào Sprint.

* Chỉ các User Story chưa hoàn thành mới được thêm vào.

* Hệ thống hỗ trợ hiển thị:

  * Tổng Story Point của Sprint

  * Dung lượng còn lại của Sprint (nếu giới hạn)

* Các User Story sau khi chọn sẽ được chia thành Task nhỏ hơn:

  * Mỗi Task có: tiêu đề, mô tả, người phụ trách, thời gian ước lượng…

* Cho phép phân công Task cho các thành viên trong nhóm.

**3\. Sprint Board**

Hiển thị trực quan trạng thái của các Task trong Sprint hiện tại.

![][image2]

**Tính năng trên Sprint Board:**

* **Drag & Drop**: Di chuyển Task qua các trạng thái.

* **Gán người thực hiện** (Assignee).

* **Gắn nhãn màu (label)** theo độ ưu tiên hoặc loại công việc (bug, feature, enhancement).

* **Bình luận** trong mỗi Task để trao đổi nhóm.

**V. Task Management (Quản lý công việc) (SubTask)**

**1\. Tạo Task từ User Story**

* Mỗi **User Story** có thể được chia nhỏ thành **nhiều Task**.

* Việc chia Task thường diễn ra trong **Sprint Planning** hoặc sau đó khi team hiểu rõ yêu cầu hơn.

* Mỗi Task cần các thông tin sau:

![][image3]

**2\. Cập nhật trạng thái Task**

* Task sẽ được di chuyển theo các trạng thái:

  * **To Do**: Chưa bắt đầu

  * **In Progress**: Đang thực hiện

  * **In Review**: Đã hoàn thành, đang chờ kiểm tra

  * **Done**: Đã hoàn tất

* Trạng thái có thể thay đổi bằng thao tác:

  * Trên **Sprint Board** (drag & drop)

  * Hoặc cập nhật từ giao diện chi tiết của Task.

**3\. Xóa task**

**VI. Daily Scrum**

**1\. Cập nhật nội dung Daily Scrum**

Mỗi thành viên trong dự án có thể cập nhật nội dung Daily Scrum mỗi ngày, bao gồm 3 phần chính:

![][image4]

**2\. Giao diện Daily Scrum**

* Giao diện **riêng biệt**, dễ sử dụng, tối ưu cho hiển thị dạng "standup".

* Hiển thị **danh sách cập nhật của toàn bộ thành viên** trong nhóm theo ngày.

* Cho phép **lọc theo ngày**, **thành viên**, hoặc **sprint** hiện tại.

**Tính năng nổi bật:**

* Thông báo nếu người dùng **quên cập nhật** sau một giờ quy định (ví dụ: 10:00 sáng).

* Cảnh báo nếu một thành viên **liên tục không cập nhật** trong nhiều ngày.

**3\. Lưu trữ & lịch sử Daily Scrum**

* Tất cả nội dung Daily Scrum được ghi lại và lưu trữ theo ngày.

* Có thể xem lại lịch sử của:

  * Từng cá nhân

  * Từng ngày trong Sprint

  * Toàn bộ Sprint

Có thể xuất ra dạng PDF hoặc CSV phục vụ báo cáo cho Scrum Master/Product Owner.

**4\. Thông báo và nhắc nhở**

* Gửi email hoặc thông báo trong hệ thống để nhắc nhở thành viên cập nhật Daily Scrum đúng giờ.

* Scrum Master có thể xem danh sách các thành viên chưa cập nhật mỗi ngày.

**VII. Sprint Review & Retrospective**

**Phần 1: Sprint Review**

**1\. Đánh giá kết quả Sprint**

* Hiển thị toàn bộ User Story và Task đã được đưa vào Sprint.

* Cho phép kiểm tra trạng thái của từng công việc:

  * **Hoàn thành** ✅

  * **Chưa hoàn thành** ❌

  * **Đang xử lý** 🔄

**2\. Thống kê Sprint**

* Số lượng Task/User Story hoàn thành vs tổng số.

* Tổng **Story Point hoàn thành**.

* Thống kê **tiến độ theo người dùng** (ai hoàn thành bao nhiêu Task).

* Có thể **xuất báo cáo** kết quả Sprint dạng PDF/Excel.

**3\. Xác nhận kết thúc Sprint**

* Scrum Master có quyền xác nhận kết thúc Sprint.

* Các User Story chưa hoàn thành có thể:

  * Tự động đưa trở lại Product Backlog.

  * Hoặc giữ lại để chuyển vào Sprint kế tiếp.

**Phần 2: Sprint Retrospective**

**4\. Nhập ý kiến phản hồi (Feedback)**

Sau mỗi Sprint, hệ thống cho phép **từng thành viên trong nhóm** đóng góp ý kiến về quá trình làm việc, với 3 nội dung chính:

![][image5]

**5\. Tổng hợp Retrospective**

* Scrum Master xem tổng hợp phản hồi của cả nhóm.

* Có thể chia sẻ bản tổng kết (summary) để cả nhóm cùng xem.

* Có tùy chọn giữ ẩn danh ý kiến nếu muốn.

**6\. Lưu trữ lịch sử**

* Mỗi Sprint Retrospective được lưu kèm với Sprint tương ứng.

* Cho phép xem lại lịch sử retrospective theo Sprint.

* Hữu ích cho việc so sánh quá trình cải tiến giữa các Sprint.

**VIII. Báo cáo và Dashboard**

**1\. Mục tiêu nghiệp vụ:**

Cung cấp cái nhìn tổng quan về tiến độ, hiệu suất và khối lượng công việc của toàn bộ dự án cũng như từng thành viên trong nhóm. Hỗ trợ các bên liên quan (Product Owner, Scrum Master, Developer) đưa ra quyết định dựa trên dữ liệu.

**2\. Chức năng hệ thống chi tiết**

**a. Biểu đồ Burndown Chart**

* **Mô tả:** Thể hiện số lượng công việc (Task hoặc Story Point) còn lại theo từng ngày trong Sprint.

* **Chức năng:**

  * Vẽ biểu đồ đường (line chart) thể hiện tổng số task/story point còn lại theo từng ngày.

  * Hiển thị đường lý tưởng (ideal line) để so sánh với thực tế.

  * Cho phép chọn sprint để xem biểu đồ tương ứng.

**b. Báo cáo tiến độ từng thành viên**

* **Mô tả:** Cung cấp thông tin chi tiết về tiến độ công việc của mỗi thành viên trong nhóm.

* **Chức năng:**

  * Hiển thị tổng số task/story được giao cho mỗi thành viên.

  * Thống kê số task đã hoàn thành, đang làm, và chưa bắt đầu.

  * Hiển thị % hoàn thành của mỗi thành viên trong sprint hiện tại.

**c. Biểu đồ phân tích khối lượng công việc**

* **Mô tả:** Giúp đánh giá sự phân bố công việc giữa các thành viên và loại công việc.

* **Chức năng:**

  * Biểu đồ cột hoặc tròn thể hiện số lượng task/story/bug theo từng thành viên.

  * Phân loại theo loại công việc: Feature, Bug, Improvement.

  * Có thể lọc theo sprint, project, team member.

**d. Thống kê số lượng story/bug/task theo trạng thái**

* **Mô tả:** Theo dõi tình trạng xử lý các yêu cầu trong hệ thống.

* **Chức năng:**

  * Thống kê tổng số task/story/bug theo các trạng thái: To Do, In Progress, In Review, Done, Blocked...

  * Hiển thị bằng biểu đồ tròn (pie chart) hoặc cột (bar chart).

  * Hỗ trợ lọc theo project, sprint, team member, thời gian.

![][image6]

**IX. Thông báo & Giao tiếp**

**1\. Hệ thống thông báo (Notification System)**

![][image7]

**2\. Giao tiếp nhóm (Team Chat)**

* **Mô hình 1: Chat Realtime (dùng WebSocket hoặc Firebase)**

  * Nhắn tin trong nhóm Scrum (team chat)

  * Chat theo Task (thread riêng theo từng task)

  * Nhận tin nhắn tức thời

  * Hiển thị trạng thái online/offline, đang gõ, đã xem

* **Mô hình 2: Giao tiếp không realtime (bình luận)**

  * Bình luận trong từng Task (giống Trello, Jira)

  * Gửi @mention để tag người khác

  * Có thể đính kèm file, ảnh

  * Lưu trữ lại dưới dạng lịch sử hoạt động (log)

**3\. Quản lý và Tùy chọn Thông báo**

* Cài đặt thông báo cá nhân:

  * Bật/tắt thông báo email

  * Chọn loại thông báo nhận: Task, Sprint, Bình luận, v.v.

* Quản lý nhật ký hoạt động:

  * Xem lịch sử tất cả các thông báo (notification history)

## **B. Quy tắc chung của dự án**

1. **Role**  
- User: Người dùng hệ thống  
- Admin: Admin hệ thống  
2. **Role in project**  
- PO: là người có toàn quyền trong dự án  
- ScrumMaster: Sửa dự án, quản lý thành viên, quản lý US, Product Backlog, Sprint, …  
- Development Team: (có thể chia nhỏ hơn để phù hợp với vai trò của từng thành viên): thao tác công việc (issue, sprint)  
- Viewer/Stakeholder: quyền chỉ xem  
- Các quyền sẽ cần lập ma trận phân quyền  
3. **Project**: một nỗ lực có mục tiêu, được chia nhỏ thành các đợt lặp ngắn (sprint). Các thông tin của Project:  
- Ngày bắt đầu  
- Ngày kết thúc  
- Tên  
- Mục tiêu  
- Mô tả  
- Trạng thái: Active, Inactive, In planning, Completed.  
4. **Product Backlog:** Product Backlog là danh sách công việc cần làm để phát triển và duy trì sản phẩm, được sắp xếp theo mức độ ưu tiên và luôn thay đổi, cập nhật trong quá trình dự án. Product Backlog chứa danh sách các công việc có trong scrum  
5. **Các kiểu công việc có trong scrum:**  
- User story  
- Bug  
- Task  
- SubTask  
- Epic (optional)  
- Feature (optional)  
6. **Sprint:** Sprint là chu kỳ làm việc ngắn, có thời gian cố định (thường 1–4 tuần) mà trong đó nhóm phát triển hoàn thành một phần giá trị của sản phẩm, tạo ra Increment sẵn sàng bàn giao. Các thông tin mà sprint có:  
- Tên sprint  
- Mục tiêu  
- Ngày bắt đầu dự kiến  
- Ngày kết thúc dự kiến  
- Ngày bắt đầu thực tế  
- Ngày kết thúc thực tế  
- Tiến độ  
- Trạng thái: Upcoming(Chưa đến ngày bắt đầu dự kiến), Missed (Qua ngày bắt đầu dự kiến nhưng chưa bấm bắt đầu), In progress (Đã bấm bắt đầu sprint), Completed(Khi bấm kết thúc), Canceled(Hủy dự án)  
7. **Sprint Backlog:** Danh sách các công việc hoàn thành trong 1 sprint  
8. **User Story**: Mô tả tính năng từ góc nhìn người dùng để đảm bảo sản phẩm mang lại giá trị. Các thông tin cần có:  
- Title  
- Description  
- Priority  
- Attachments  
- Story points  
- Assignee  
- Reporter  
- Time estimation  
- Status:   
+ Backlog: Chưa gán Sprint.  
+ Planned: Đã gán vào Sprint, chưa bắt đầu.  
+ To do: Đã gán vào Sprint, và sprint active nhưng subtask chưa làm  
+ In Progress: Đang thực hiện.  
+ In Review: Chờ review/QA/UAT.  
+ Done: Hoàn thành theo Definition of Done.  
+ Canceled: Hủy   
9. **Task:** giống US  
10.  **SubTask:** giống US  
11.  **Bug:** giống US  
12.  **Mối quan hệ giữa các loại công việc**  
- Blocked  
- Blocked By  
- Duplicated  
- Duplicated By  
- Related to  
- Child/Parent

## **C. Luồng nghiệp vụ**

**I. Luồng nghiệp vụ cho quản lý dự án**

**1.Tạo dự án mới**

\-  **Actor**: bất kỳ user đã đăng nhập

\- **Tiền điều kiện**: user có quyền tạo dự án (theo policy của hệ thống)

\- **Luồng chính**

* User mở “Tạo dự án”.  
* Nhập: Tên dự án (bắt buộc), Mô tả (tuỳ chọn), Start date, End date, Trạng thái lựa chọn \= (“Đang hoạt động”, “Chưa bắt đầu”).

\- **Hệ thống validate:**

* Tên không rỗng, không trùng trong phạm vi tổ chức/workspace (nếu có).  
* Nếu có Start/End: Start ≤ End.

\- **Lưu dự án:**

* Tạo bản ghi Project.  
* Gán người tạo làm Product Owner (PO) của dự án.  
* Khởi tạo các cấu hình mặc định (quy ước mã dự án, quyền, cài đặt backlog…).  
* Thông báo thành công, điều hướng sang trang chi tiết dự án.

# **2\. Chỉnh sửa dự án**

**Actor**: Product Owner hoặc Scrum Master  
**Tiền điều kiện**: dự án tồn tại, user ∈ {PO, SM}

**Luồng chính**

1. User mở “Sửa dự án”.

2. Có thể cập nhật: Tên, Mô tả, Start/End, Trạng thái.

3. Hệ thống validate:

   * Quyền: chỉ PO/SM.

   * Tên không rỗng, quy tắc trùng tên (nếu áp).

   * Start ≤ End.

   * Quy tắc trạng thái:

     * Nếu chuyển sang “Đã hoàn thành”: tất cả Sprint đã Done hoặc bị Closed.

     * Nếu chuyển sang “Đã hủy”: hiện cảnh báo ảnh hưởng dữ liệu/sprint \=\> đổi trạng thái sprint thành đã hủy.

4. Lưu thay đổi, cập nhật bản ghi và thời gian cập nhật/updatedBy.

5. Thông báo thành công. Nếu trạng thái đổi, phát sự kiện để các module (Sprint/Backlog) đồng bộ.

**Nhánh/ngoại lệ**

* Không đủ quyền → 403\.

* Vi phạm ràng buộc thời gian/trạng thái → báo lỗi, không lưu.

* Tên trùng → báo lỗi.

**Hậu điều kiện**

* Dự án phản ánh cấu hình mới.

* Log/Audit: “ProjectUpdated” (diff các trường).

# **3\. Xoá dự án**

# **Actor**: Product Owner **Tiền điều kiện**: user là PO của dự án

**Luồng chính**

1. PO bấm “Xoá dự án”.

2. Hệ thống hiển thị hộp xác nhận (nội dung cảnh báo rõ: backlog, sprint, task, lịch sử… sẽ *xóa hoặc lưu trữ* theo cấu hình).

3. PO xác nhận (nhập tên dự án hoặc gõ DELETE để chắc chắn).

4. Hệ thống kiểm tra policy “Xóa vs Lưu trữ”:

   * Hard delete: xoá mềm trước (status=Deleted), sau đó job nền dọn dữ liệu con theo thứ tự an toàn (Sprints → Issues → Comments → Attachments…).

   * Archive: chuyển trạng thái “Archived”, đóng băng mọi thao tác, ẩn khỏi danh sách mặc định.

5. Thông báo thành công.

**Nhánh/ngoại lệ**

* Không phải PO → 403\.

* Dự án đang có sprint Active → yêu cầu đóng sprint trước (nếu policy không cho xóa khi còn Active).

* Lỗi ràng buộc dữ liệu → chuyển sang Archive thay vì Hard delete (tuỳ policy).

**Hậu điều kiện**

* Dự án bị xóa hoặc chuyển “Archived”.

* Tất cả dữ liệu con xử lý theo policy.

* Log/Audit: “ProjectDeleted” hoặc “ProjectArchived”.

# **4\. Gán thành viên vào dự án**

**Actor:** PO hoặc SM  
**Tiền điều kiện:** user là PO/SM, người được thêm đã có tài khoản (email hợp lệ)

**Luồng chính**

1. PO/SM mở “Thêm thành viên”.

2. Nhập email người dùng; chọn vai trò: PO / SM / Development Role /

3. Hệ thống:

   * Tìm user theo email; nếu chưa có tài khoản:

     * tạo **invitation** gửi email đăng ký và **treo** vai trò cho đến khi user kích hoạt.

   * Kiểm tra quy tắc vai trò

4. Thêm vào bảng thành viên dự án (ProjectMembers).

5. Gửi thông báo (email/in-app) cho người được thêm.

6. Cập nhật quyền truy cập ngay lập tức.

**Nhánh/ngoại lệ**

* Email không tồn tại & không cho invite → báo lỗi.

* Vai trò xung đột (ví dụ hệ thống cấm 1 người vừa PO vừa SM) → báo lỗi.

**Hậu điều kiện**

* Thành viên mới có vai trò tương ứng, thấy dự án theo quyền.

* Log/Audit: “MemberAdded(role=…)”.

# **5.Quản lý danh sách thành viên**

**Actor:** PO hoặc SM (xem/đổi vai trò/xóa); mọi thành viên (chỉ xem)  
**Tiền điều kiện:** dự án tồn tại

**Luồng xem**

1. Người dùng mở “Thành viên”.

2. Hệ thống liệt kê: Họ tên, Email, Vai trò, Ngày tham gia.

3. Lọc/ tìm kiếm theo vai trò, tên, email.

**Luồng đổi vai trò (PO/SM)**

1. Chọn thành viên → “Đổi vai trò”.

2. Chọn vai trò mới.

3. Validate:

   * Không tự tước vai trò PO cuối cùng của dự án (phải luôn có ≥1 PO).

   * Quy tắc xung đột vai trò (nếu có).

4. Lưu thay đổi, gửi thông báo.

**Luồng xoá thành viên (PO/SM)**

1. Chọn thành viên → “Xóa khỏi dự án”.

2. Xác nhận.

3. Validate:

   * Không thể xóa **PO cuối cùng**.

   * Không thể xóa chính mình nếu là **PO duy nhất**.

4. Gỡ quyền & ràng buộc:

   * Reassign nhiệm vụ đang mở (hoặc giữ nguyên nhưng ở trạng thái “Unassigned” theo policy).

5. Gửi thông báo.

6. Khi xóa thành thành viên vẫn lưu history work của thành viên đó. 

**Hậu điều kiện**

* Danh sách cập nhật, quyền truy cập phản ánh tức thì.

* Log/Audit: “MemberRoleChanged”, “MemberRemoved”.

# **Quy tắc quyền & bảo toàn dữ liệu (áp dụng chung)**

* **Quyền tối thiểu**

  * PO: full quyền trong dự án (tạo/sửa/xóa dự án, quản lý thành viên).

  * SM: sửa dự án, quản lý thành viên (không xóa dự án trừ khi policy cho).

  * Dev: thao tác công việc (issue, sprint), **không** đổi cấu hình dự án.

  * Viewer/Stakeholder: chỉ xem.

* **Bảo toàn**

  * Luôn duy trì **ít nhất 1 PO**.

  * Xóa/Archive phải có xác nhận \+ audit trail.

  * Thay đổi mốc thời gian dự án **không** làm hỏng dữ liệu con: nếu vi phạm, chặn lưu và hiển thị những sprint/issue bị ảnh hưởng để người dùng điều chỉnh trước.

    

**II. Luồng nghiệp vụ cho chức năng Product Backlog**

## **Vai trò & phân quyền**

* **Product Owner (PO)**: Tạo/chỉnh sửa/xóa User Story; tạo Sprint; chọn User Story cho Sprint; thay đổi ưu tiên.

* **Scrum Master (SM)**: Tạo Sprint; hỗ trợ lập kế hoạch; quản trị bảng Sprint; điều phối WIP.

* **Development Team (Dev)**: Bổ sung mô tả kỹ thuật, ước lượng Task, nhận việc, cập nhật trạng thái Task.

* **Stakeholder/Viewer**: Xem backlog/sprint, không chỉnh sửa.

## **Thuật ngữ & trạng thái**

### **User Story — các trạng thái chính**

* **Backlog**: Chưa gán Sprint.

* **Planned**: Đã gán vào Sprint, chưa bắt đầu.

* **To do:** Đã gán vào Sprint, và sprint active nhưng subtask chưa làm

* **In Progress**: Đang thực hiện.

* **In Review**: Chờ review/QA/UAT.

* **Done**: Hoàn thành theo Definition of Done.

* **Canceled/Removed**: Hủy hoặc loại khỏi Sprint.

### Sprint — các trạng thái

* **Planned**: Vừa tạo, chưa active.

* **Active**: Đang diễn ra (duy nhất 1 Sprint active mỗi dự án).

* **Completed**: Kết thúc đúng hạn (có thể còn việc spillover).

* **Closed**: Đã tổng kết, khóa chỉnh sửa phạm vi.

* **Canceled**: Hủy giữa chừng (có biên bản lý do).

### Quy tắc chung

* Story Point dùng dãy Fibonacci (1, 2, 3, 5, 8, 13…) hoặc Planning Poker; hệ thống có thể cấu hình.

* Chỉ **01 Sprint Active**/dự án tại một thời điểm.

* Không xóa cứng dữ liệu đã sử dụng trong báo cáo: ưu tiên **Archive** và ghi audit log.

## **1.Thêm User Story vào Product Backlog**

**Tác nhân**: PO  
**Tiền điều kiện**: Dự án tồn tại; người dùng có quyền PO.  
**Dữ liệu đầu vào**: Title (bắt buộc), Description (As a…, I want…, so that…), Priority, Story Point.

**Luồng chính**

1. PO chọn **“Tạo User Story”** trong dự án.

2. Nhập thông tin: Title, Description theo chuẩn Agile; Priority; Story Point.

3. Hệ thống **validate**:

   * Title không rỗng, duy nhất trong phạm vi dự án (cảnh báo nếu trùng gần giống).

   * Story Point nằm trong tập cho phép (hoặc cho phép “Unestimated”).

   * Description có cấu trúc (có thể nhắc PO sửa nếu thiếu vai trò/lợi ích).

4. PO bấm **Lưu**.

5. Hệ thống tạo User Story trạng thái **Backlog**, gán vào Product Backlog của dự án, ghi **audit log**.

6. Hiển thị thông báo thành công và đưa người dùng về danh sách Backlog (scroll đến item mới).

**Ngoại lệ/nhánh**

* Thiếu trường bắt buộc → hiển thị lỗi inline; không lưu.

* Trùng tiêu đề → cảnh báo; cho phép vẫn lưu nếu PO xác nhận (gắn tag duplicate-risk).

**Hậu điều kiện**: User Story ở trạng thái **Backlog**; có mã định danh; sẵn sàng để grooming.

## **2\. Chỉnh sửa User Story**

**Tác nhân**: PO hoặc người được phân quyền.  
**Tiền điều kiện**: User Story tồn tại; người dùng có quyền.

**Luồng chính**

1. Mở chi tiết User Story → **Edit**.

2. Cập nhật: Title, Description, Priority, Story Point.

3. Hệ thống **validate** tương tự khi tạo mới.

4. Nếu User Story đang ở Sprint **Active**, hệ thống hiển thị cảnh báo về ảnh hưởng phạm vi.

5. Xác nhận **Lưu**.

6. Hệ thống cập nhật, ghi **audit log** (trước/sau), thông báo thành công.

**Ngoại lệ/nhánh**

* Thiếu quyền → 403 \+ gợi ý liên hệ PO/SM.

* Story đã **Done** trong Sprint Closed → chỉ cho phép sửa metadata không ảnh hưởng báo cáo (ví dụ label), còn Title/Story Point bị khóa trừ khi là Admin.

**Hậu điều kiện**: User Story cập nhật đúng, lịch sử thay đổi được lưu.

## **3\. Xóa User Story**

**Tác nhân**: PO.  
**Tiền điều kiện**: User Story tồn tại.

**Luồng chính**

1. PO tick một hoặc nhiều User Story → **Delete**.

2. Hệ thống hiển thị **hộp xác nhận**: số lượng, tên, ảnh hưởng.

3. Nếu story đang gắn Sprint:

   * Sprint **Planned/Active** → cảnh báo tác động; gợi ý **Remove from Sprint** thay vì xóa; hoặc chọn **Archive**.

   * Sprint **Completed/Closed** → **không cho xóa cứng**; chỉ **Archive**.

4. PO xác nhận hành động.

5. Hệ thống thực hiện:

   * Mặc định **Archive** (có filter “Đã lưu trữ”).

   * Xóa cứng chỉ với quyền Admin và khi chưa xuất hiện trong bất kỳ báo cáo/bảng ghi nhận.

6. Ghi **audit log**, hiển thị kết quả.

**Ngoại lệ/nhánh**

* Batch delete: nếu một phần tử lỗi → thực hiện **best-effort**, trả về danh sách thất bại.

**Hậu điều kiện**: Story bị Archive hoặc xóa theo chính sách; không phá vỡ báo cáo lịch sử.

## **4\. Gán User Story vào Sprint**

**Tác nhân**: PO/SM.  
**Tiền điều kiện**: Sprint tồn tại (Planned/Active); Story ở Backlog.

**Luồng chính**

1. Ở màn **Backlog**, PO/SM kéo-thả Story vào Sprint (hoặc dùng nút **Add to Sprint**).

2. Hệ thống kiểm tra:

   * Sprint **chưa kết thúc** (không ở Completed/Closed/Canceled).

   * **Capacity**: Tổng Story Point sau khi thêm không vượt **giới hạn** (cấu hình hoặc dựa trên velocity).

3. Nếu vượt capacity:

   * Cảnh báo \+ đề xuất: đổi Sprint, hạ ưu tiên, hoặc chấp thuận vượt (nếu quyền cho phép).

4. Khi đạt điều kiện, hệ thống gán Story → trạng thái **Planned**.

5. Ghi audit log; cập nhật tổng Story Point Sprint.

**Ngoại lệ/nhánh**

* Sprint đã **Active** nhưng còn chỗ trống → cho phép thêm; ghi chú thay đổi phạm vi giữa Sprint.

* Story có **phụ thuộc** chưa đáp ứng → cảnh báo và chặn/cho phép override (có lý do).

**Hậu điều kiện**: Story thuộc Sprint mục tiêu, cập nhật chỉ số capacity.

## **5.Kiểm tra trạng thái User Story**

**Tác nhân**: Tất cả.  
**Luồng chính**

1. Người dùng mở **Backlog & Sprint View**.

2. Hệ thống cung cấp filter: Theo Sprint, Theo trạng thái (Backlog/Planned/In Progress/In Review/Done), Theo assignee, Theo label/priority.

3. Hiển thị **count** theo trạng thái, **tổng Story Point** theo filter, biểu đồ mini (burnup backlog).

4. Cho phép mở chi tiết và điều hướng nhanh đến Sprint Board nếu story thuộc sprint.

**Hậu điều kiện**: Người dùng nắm được trạng thái và phân bổ công việc.

# **III. Sprint Review & Retrospective**

### **Giải thích nhanh**

* **Sprint Review**: buổi kiểm tra “kết quả” sprint (Increment) với stakeholder; tập trung vào *đã làm được gì*.

* **Sprint Retrospective**: buổi nhìn lại “quy trình làm việc”; tập trung vào *cách làm* (điểm tốt, điểm cần cải thiện, hành động cải tiến).

## **1.Xem tổng quan Sprint Review**

**Actor**: PO, SM, Dev, Viewer  
 **Tiền điều kiện**: Sprint đang *Active* hoặc vừa *End*. Có dữ liệu story/task.  
 **Kích hoạt**: Người dùng mở “Sprint Review” của sprint X.

**Luồng chính**

1. Người dùng chọn Project → Sprint hiện tại hoặc sprint đã chọn.

2. Hệ thống tải danh sách **User Story** \+ **Task** cùng trạng thái (Done/In Progress/To Do).

3. Hiển thị tổng quan: số story đưa vào sprint, số hoàn thành, số còn lại; tổng story point done.

4. Cho phép lọc theo assignee, type (Feature/Bug/Improvement).

5. Cho phép mở chi tiết 1 story để xem task con, comment, file đính kèm, commit liên quan.

**Ngoại lệ/nhánh**

* (E1) Sprint không có dữ liệu: hiển thị trạng thái trống \+ gợi ý đưa story vào sprint.

* (E2) Người dùng không có quyền xem sprint của project này → báo lỗi 403\.

**Hậu điều kiện**: Không thay đổi dữ liệu; chỉ xem.

**Quy tắc**: Dev/Viewer có quyền xem; chỉ PO/SM có quyền thao tác kết thúc sprint (xem UC-VII-3).

## **2.Thống kê Sprint**

**Actor**: PO, SM  
 **Tiền điều kiện**: Có dữ liệu time tracking/điểm và trạng thái task/story.  
 **Kích hoạt**: Mở tab “Thống kê” trong Sprint Review.

**Luồng chính**

1. Hệ thống tính:

   * \#Story/Task **hoàn thành** vs **tổng**.

   * **Tổng Story Point hoàn thành**.

   * **Tiến độ theo người dùng** (mỗi người: \#task done / tổng, % hoàn thành).

2. Render biểu đồ cột/đường theo người, bảng chi tiết.

3. Nút **Xuất báo cáo** (PDF/Excel) → xem UC-VII-2a.

**Ngoại lệ**

* (E1) Thiếu điểm story point → hiển thị cảnh báo “1 số story chưa có point”.

* (E2) Không đủ quyền xuất báo cáo (tùy cấu hình) → 403\.

**Hậu điều kiện**: Không thay đổi dữ liệu.

**3.Xuất báo cáo Sprint (PDF/Excel)**

* **Actor**: PO, SM

* **Luồng chính**: Chọn định dạng → hệ thống tạo file → cho tải xuống.

* **Ngoại lệ**: Khối lượng dữ liệu lớn → tạo file async bị hạn chế? (nếu có) → ở đây nên giới hạn khoảng thời gian/sprint, hoặc phân trang trước khi xuất.

* **Hậu điều kiện**: File xuất phản ánh snapshot tại thời điểm xuất.

## **4\. Xác nhận kết thúc Sprint**

**Actor**: **Scrum Master** (PO tùy chính sách)  
 **Tiền điều kiện**: Sprint đang *Active*; người thao tác có quyền; đã xem thống kê.  
 **Kích hoạt**: Bấm **“Kết thúc Sprint”**.

**Luồng chính**

1. Hệ thống rà soát trạng thái tất cả story/task.

2. Nếu tồn tại **story/task chưa Done** → hiển thị **tùy chọn xử lý**:

   * (A) **Đưa về Product Backlog**,

   * (B) **Giữ lại để chuyển sang Sprint kế tiếp** (nếu Sprint kế tiếp đã tạo),

   * (C) **Hủy** (nếu là hạng mục không còn cần).

3. Người dùng chọn phương án cho *từng story* hoặc “áp dụng cho tất cả chưa xong”.

4. Hệ thống chốt: cập nhật trạng thái Sprint → **Completed/Ended**; ghi **biên bản kết thúc** (ngày giờ, người thực hiện).

5. Tạo **log sự kiện** và (nếu bật) gửi **thông báo** (xem IX).

**Ngoại lệ/nhánh**

* (E1) Có task ở trạng thái **In Review** hoặc **Blocked**: cảnh báo → cho phép chuyển nhanh sang To Do/In Progress của sprint sau hoặc Backlog.

* (E2) Không có Sprint kế tiếp nhưng chọn (B): yêu cầu tạo Sprint mới hoặc chuyển sang (A).

* (E3) Thiếu quyền → 403\.

* (E4) Sprint đã hết hạn ngày nhưng chưa kết thúc: cho phép kết thúc muộn; log thời điểm thực tế.

**Hậu điều kiện**

* Sprint chuyển trạng thái **Completed**.

* Story chưa xong được **di chuyển** theo lựa chọn.

* Burndown/Report chốt số liệu.

**Quy tắc**

* Một project chỉ có **1 sprint Active** tại một thời điểm.

* Sau khi end sprint, **không** chỉnh sửa work item trong sprint đó (chỉ đọc/lịch sử).

## **5\. Gửi phản hồi Retrospective (cá nhân)**

**Actor**: Toàn bộ thành viên sprint (Dev/PO/SM)  
 **Tiền điều kiện**: Sprint đã End hoặc đang ở giai đoạn retro; người dùng thuộc sprint.  
 **Kích hoạt**: Mở form “Retrospective” sprint X.

**Giải thích**: Mẫu phổ biến **Start / Stop / Continue** (hoặc **Keep / Problem / Try**).

**Luồng chính**

1. Người dùng chọn nhóm ý kiến: *Start/Stop/Continue*.

2. Nhập nội dung, có thể ẩn danh (nếu chính sách bật).

3. Gửi phản hồi → hệ thống lưu (userId hoặc anonymousId), thời gian, sprintId.

4. Tùy chọn đính kèm ví dụ/bằng chứng (link task, ảnh).

**Ngoại lệ**

* (E1) Đóng form retro (quá hạn) → không cho gửi mới; chỉ xem.

* (E2) Ẩn danh bật nhưng người dùng cố gắng đề lộ danh tính trong nội dung → cảnh báo “nội dung có thông tin cá nhân”.

**Hậu điều kiện**: Ý kiến được lưu; SM/PO có thể xem tổng hợp (UC-VII-5).

## **6.Tổng hợp & chia sẻ Retrospective**

**Actor**: **Scrum Master** (PO xem được)  
 **Tiền điều kiện**: Có feedback đã gửi.  
 **Kích hoạt**: SM mở trang “Tổng hợp Retro”.

**Luồng chính**

1. Hệ thống gom nhóm theo **Start/Stop/Continue**; đếm số bình chọn (nếu có like/upvote).

2. Cho phép **gộp ý kiến trùng** (merge) và **ẩn thông tin cá nhân** nếu bật ẩn danh.

3. SM tạo **Action Items** (hành động cải tiến) với **chủ sở hữu** & **deadline**.

4. Bấm **Chia sẻ**: gửi summary cho cả team (notification/email).

**Ngoại lệ**

* (E1) Không có feedback → gợi ý tạo action items từ dữ liệu sprint (ví dụ: tỷ lệ blocked cao).

* (E2) SM chưa phân công owner cho action item → cảnh báo trước khi lưu.

**Hậu điều kiện**: Bản tổng kết \+ danh sách action items được lưu vào **lịch sử sprint**.

## **7\. Lưu trữ & tra cứu lịch sử Retrospective**

**Actor**: SM, PO (Viewer xem nếu được cấp quyền)  
 **Tiền điều kiện**: Đã có ít nhất 1 retro trước đó.  
 **Kích hoạt**: Mở “Retro History”.

**Luồng chính**

1. Chọn sprint quá khứ hoặc lọc theo thời gian.

2. Hệ thống hiển thị: tổng hợp, action items và **trạng thái hoàn thành** của action items ở sprint kế tiếp.

3. Cho phép **xuất PDF** để đối chiếu cải tiến qua các sprint.

**Ngoại lệ**: Quyền hạn hạn chế → 403 (VD: Viewer chỉ xem phần được công khai).

**Hậu điều kiện**: Không đổi dữ liệu; phục vụ tra cứu/cải tiến.

# **IV. Báo cáo & Dashboard**

### **Giải thích nhanh**

* **Burndown Chart**: đường thể hiện *khối lượng công việc còn lại* theo ngày trong sprint so với đường **lý tưởng** (ideal).

* **Workload**: phân tích *phân bố khối lượng* theo người/loại công việc (Feature/Bug/Improvement).

## **1\. Xem Burndown Chart**

**Actor**: PO, SM, Dev, Viewer  
 **Tiền điều kiện**: Sprint Active có log tiến độ theo ngày (task/story point còn lại).  
 **Kích hoạt**: Mở Dashboard → tab Burndown.

**Luồng chính**

1. Người dùng chọn sprint.

2. Hệ thống vẽ **2 đường**:

   * **Thực tế**: tổng điểm/task còn lại theo ngày (tính đến cuối ngày).

   * **Lý tưởng**: đường thẳng từ tổng đầu sprint → 0 tại end date.

3. Tooltip hiển thị chi tiết từng ngày, sự kiện (nút tăng/giảm bất thường).

4. Cho phép chuyển đơn vị: **Story Point** hoặc **\#Task**.

**Ngoại lệ**

* (E1) Sprint không có story point → mặc định theo \#Task và cảnh báo.

* (E2) Dữ liệu thiếu ngày (không log) → nội suy hoặc giữ nguyên giá trị ngày gần nhất \+ cảnh báo.

**Hậu điều kiện**: Không đổi dữ liệu.

**Quy tắc**: Cắt dữ liệu theo **khung thời gian sprint**; không vượt ngày project.

## **2\. Báo cáo tiến độ từng thành viên**

**Actor**: PO, SM (Dev xem được phần của mình)  
 **Tiền điều kiện**: Có mapping task ↔ assignee.  
 **Kích hoạt**: Mở tab “Tiến độ thành viên”.

**Luồng chính**

1. Hệ thống tổng hợp cho mỗi thành viên:

   * Tổng task/story được giao.

   * \#Done, \#In Progress, \#To Do.

   * **% hoàn thành** trong sprint.

2. Bảng \+ biểu đồ cột; lọc theo **ngày**, **loại công việc**.

3. Click 1 người → drill-down danh sách work item.

**Ngoại lệ**: Assignee trống → gom vào “Unassigned”.

**Hậu điều kiện**: Không đổi dữ liệu.

**Quy tắc**: Ẩn dữ liệu nhạy cảm theo vai trò (VD Viewer không thấy ước lượng giờ nếu bị chặn).

## **3\. Phân tích khối lượng công việc (Workload)**

**Actor**: PO, SM  
 **Tiền điều kiện**: Task có trường *type* (Feature/Bug/Improvement).  
 **Kích hoạt**: Mở tab “Workload”.

**Luồng chính**

1. Biểu đồ **cột** theo người: số lượng task/story/bug.

2. Biểu đồ **tròn** theo *type* trong sprint/project.

3. Bộ lọc: sprint, project, member.

**Ngoại lệ**: Dữ liệu thiếu *type* → gom “Unknown” \+ cảnh báo.

**Hậu điều kiện**: Không đổi dữ liệu.

**Quy tắc**: Số liệu thống nhất với board (trạng thái và scope cùng kỳ).

## 

## **3\. Thống kê theo trạng thái**

**Actor**: PO, SM, Viewer  
 **Tiền điều kiện**: Task/story có trạng thái chuẩn hóa (To Do/In Progress/In Review/Done/Blocked).  
 **Kích hoạt**: Mở tab “Trạng thái”.

**Luồng chính**

1. Tổng hợp số lượng theo trạng thái.

2. Hiển thị **pie chart** hoặc **bar chart**.

3. Lọc theo project/sprint/member/thời gian.

**Ngoại lệ**: Có trạng thái custom → hiển thị thêm; đánh dấu bằng nhãn tùy chỉnh.

**Hậu điều kiện**: Không đổi dữ liệu.

## **5\. Lọc & Xuất báo cáo Dashboard**

**Actor**: PO, SM  
 **Tiền điều kiện**: Đã áp bộ lọc hiện thời.  
 **Kích hoạt**: Bấm “Export”.

**Luồng chính**

1. Người dùng chọn định dạng (PNG cho chart, PDF/Excel cho bảng).

2. Hệ thống đóng gói **ảnh chart \+ bảng số liệu** theo phạm vi lọc.

3. Trả file tải xuống.

**Ngoại lệ**: Dung lượng lớn → nhắc thu hẹp phạm vi hoặc tách nhiều file.

**Hậu điều kiện**: Không đổi dữ liệu; lưu log xuất báo cáo.

# **V. Thông báo & Giao tiếp**

### **Giải thích nhanh**

* **Notification System**: cơ chế phát sinh, phân phối, và lưu lịch sử thông báo (trong-app, email, push).

* **Realtime Chat (WebSocket/Firebase)**: kênh nhắn tin tức thời (online status, đang gõ, đã xem).

* **Comment**: bình luận gắn với Task/Story, lưu sử dụng như “nhật ký công việc”.

## **1\. Cài đặt thông báo cá nhân**

**Actor**: Tất cả người dùng  
 **Tiền điều kiện**: Đã đăng nhập.  
 **Kích hoạt**: Mở “Notification Settings”.

**Luồng chính**

1. Người dùng bật/tắt kênh: **Email**, **In-app**

2. Chọn loại sự kiện muốn nhận: Task, Sprint, Bình luận, @mention, Daily Scrum…

3. Lưu cấu hình.

**Ngoại lệ**: Email chưa xác thực → cấm bật email, yêu cầu verify.

**Hậu điều kiện**: Cấu hình được áp dụng cho các sự kiện sau này.

**Quy tắc**: Tôn trọng tắt thông báo của người dùng trừ thông báo **bắt buộc** (bảo mật, đổi mật khẩu).

## **2\. Phát sinh thông báo hệ thống (Event → Notification)**

**Actor**: Hệ thống (tự động), hoặc người dùng khi tạo hành động  
 **Tiền điều kiện**: Có **event** xảy ra trong phạm vi dự án.  
 **Ví dụ event**:

* Gán task cho user A; đổi trạng thái task; tạo/đóng sprint; comment mới; @mention; quên cập nhật Daily Scrum; feedback retro; file đính kèm; hạn chót sắp đến/đã quá.

**Luồng chính**

1. Sự kiện phát sinh → đẩy vào hàng đợi (queue) hoặc xử lý sync.

2. Hệ thống tính **đối tượng nhận** (assignee, watcher, người được @mention, SM/PO liên quan).

3. Đối chiếu **Notification Settings** của từng người.

4. Gửi thông báo qua kênh phù hợp (in-app/email).

5. Ghi **notification history** (nội dung rút gọn, link đến đối tượng, thời điểm, trạng thái đọc).

**Ngoại lệ**

* (E1) Người nhận tắt kênh → bỏ qua kênh đó.

* (E2) Email gửi lỗi → retry policy; log error.

* (E3) Quyền riêng tư: người không thuộc project → không phát thông báo.

**Hậu điều kiện**: Thông báo được phân phối và lưu vết.

**Quy tắc**: Tránh spam: **gộp sự kiện** trong khoảng thời gian ngắn (debounce) với cùng đối tượng.

## **3\. Xem lịch sử thông báo**

**Actor**: Mọi người dùng  
 **Tiền điều kiện**: Đã có notification history.  
 **Kích hoạt**: Mở “Notification Center”.

**Luồng chính**

1. Tải danh sách thông báo mới nhất, phân trang.

2. Cho phép **đánh dấu đã đọc**, **đọc tất cả**, **lọc theo loại/kênh**.

3. Click 1 item → chuyển đến trang đối tượng (task/story/sprint).

**Ngoại lệ**: Không có thông báo → hiển thị trạng thái trống.

**Hậu điều kiện**: Cập nhật trạng thái đã đọc cho item tương ứng.

## **4\. Chat nhóm realtime (team-level)**

**Actor**: Thành viên project  
 **Tiền điều kiện**: Kết nối realtime (WebSocket/Firebase) hoạt động; user thuộc project.  
 **Kích hoạt**: Mở “Team Chat”.

**Luồng chính**

1. Hệ thống kết nối socket; hiển thị danh sách kênh (mặc định theo project).

2. Người dùng gửi tin nhắn → server broadcast tới thành viên đang online.

3. Hiển thị **online/offline**, **typing**, **đã xem** (read receipts).

**Ngoại lệ**

* (E1) Mất kết nối realtime → fallback: gửi/nhận chậm (polling) hoặc cảnh báo.

* (E2) Người dùng rời project → bị remove quyền truy cập kênh.

**Hậu điều kiện**: Tin nhắn lưu vào **message store** gắn với project.

**Giải thích**: *WebSocket* là giao thức 2 chiều giúp client–server trao đổi tức thời. *Firebase Realtime/Firestore* là dịch vụ đám mây cung cấp đồng bộ dữ liệu realtime “as-a-service”.

## **5\. Bình luận trên Task/Story**

**Actor**: Thành viên có quyền chỉnh/sửa hoặc bình luận  
 **Tiền điều kiện**: Có đối tượng (Task/Story).  
 **Kích hoạt**: Mở chi tiết → tab “Comments”.

**Luồng chính**

1. Người dùng nhập comment; hỗ trợ **@mention**.

2. Lưu comment vào hệ thống; cập nhật **activity log**.

3. Gửi **notification** tới người liên quan (theo cài đặt).

**Ngoại lệ**: Nội dung vượt dung lượng cho phép → báo lỗi; nhắc rút gọn.

**Hậu điều kiện**: Bình luận hiển thị theo thời gian; có thể chỉnh sửa/xóa (nếu policy cho phép).

## **6\. Đính kèm file trong chat/comment**

**Actor**: Thành viên project  
 **Tiền điều kiện**: Dung lượng file trong ngưỡng cho phép; loại file hợp lệ.  
 **Kích hoạt**: Bấm “Attach” trong chat/comment.

**Luồng chính**

1. Upload file → lưu vào kho (S3/local) kèm metadata (người gửi, thời điểm, quyền).

2. Gắn link/preview vào tin nhắn/bình luận.

3. Gửi notification (nếu cấu hình).

**Ngoại lệ**

* (E1) File vượt hạn mức hoặc loại bị chặn (exe, script) → từ chối \+ thông báo.

* (E2) Lỗi mạng khi upload → retry, cho phép resume nếu hỗ trợ.

**Hậu điều kiện**: Tệp được quản lý quyền truy cập theo project/task.

**VI.Task & SubTask**

**1\. Tạo SubTask từ User Story**

**Actor:** Scrum Master, Product Owner (tùy quyền).

**Tiền điều kiện:**

* Có User Story tồn tại trong Sprint hiện tại.

* Người thao tác có quyền tạo SubTask.

**Kích hoạt:**

* Chọn User Story → bấm “Tạo SubTask” trên giao diện.

**Luồng chính:**

1. Hệ thống hiển thị form tạo SubTask, với các trường: tiêu đề, mô tả, trạng thái ban đầu, người phụ trách, thời gian dự kiến, file đính kèm (tùy chọn).

2. Người dùng nhập thông tin và xác nhận lưu.

3. Hệ thống tạo mới SubTask, gắn liên kết với User Story tương ứng.

4. Cập nhật Sprint Board hiển thị SubTask mới ở trạng thái **To Do**.

5. Ghi log sự kiện và (nếu bật) gửi thông báo đến thành viên liên quan.

**Ngoại lệ/nhánh:**

* (E1) Không có quyền → 403\.

* (E2) User Story đã thuộc Sprint đã kết thúc → không cho phép tạo SubTask mới.

* (E3) Thiếu thông tin bắt buộc → hiển thị lỗi, yêu cầu nhập bổ sung.

**Hậu điều kiện:**

* SubTask mới được tạo và liên kết với User Story.

* Thông tin xuất hiện trên Sprint Board.

**Quy tắc:**

* Một SubTask chỉ thuộc một User Story duy nhất.

* Trạng thái mặc định khi tạo là **To Do**.

## **2\. Cập nhật trạng thái SubTask**

**Actor:** Developer, Scrum Master.

**Tiền điều kiện:**

* SubTask tồn tại trong Sprint đang Active.

* Người thao tác có quyền cập nhật.

**Kích hoạt:**

* Thực hiện drag & drop trên Sprint Board hoặc cập nhật từ giao diện chi tiết SubTask.

**Luồng chính:**

1. Người dùng thay đổi trạng thái SubTask (To Do, In Progress, In Review, Done).

2. Hệ thống ghi nhận trạng thái mới, cập nhật trên Sprint Board và trong cơ sở dữ liệu.

3. Ghi log sự kiện và (nếu bật) gửi thông báo cho người liên quan.

**Ngoại lệ/nhánh:**

* (E1) Task thuộc Sprint đã Completed → chỉ cho phép đọc, không thay đổi.

* (E2) Không có quyền → 403\.

* (E3) Chuyển trạng thái không hợp lệ (ví dụ: từ Done quay về In Review nhưng Sprint đã kết thúc) → báo lỗi.

**Hậu điều kiện:**

* Trạng thái SubTask được cập nhật và đồng bộ cho tất cả người dùng.

**Quy tắc:**

* Chỉ các trạng thái trong quy trình (To Do → In Progress → In Review → Done) mới hợp lệ.

## **3\. Xóa SubTask**

**Actor:** Scrum Master, Product Owner.

**Tiền điều kiện:**

* SubTask tồn tại trong hệ thống.

* Người thao tác có quyền xóa SubTask .

**Kích hoạt:**

* Chọn Task → bấm “Xóa SubTask” trên giao diện.

**Luồng chính:**

1. Người dùng thực hiện thao tác xóa SubTask.

2. Hệ thống hiển thị hộp thoại xác nhận (Confirm).

3. Người dùng xác nhận xóa.

4. Hệ thống kiểm tra:

   * SubTask không thuộc Sprint đã hoàn thành.

5. Nếu hợp lệ, hệ thống xóa SubTask khỏi cơ sở dữ liệu và cập nhật Sprint Board.

6. Ghi log sự kiện và (nếu bật) gửi thông báo cho người liên quan.

**Ngoại lệ/nhánh:**

* (E1) Không có quyền → 403\.

* (E2) Task thuộc Sprint Completed → không cho phép xóa.

* (E3) Người dùng hủy thao tác ở bước xác nhận → không thực hiện gì.

* (E4) SubTask có dữ liệu ràng buộc (ví dụ: log tiến độ, comment quan trọng) → yêu cầu xác nhận bổ sung

**Hậu điều kiện:**

* SubTask bị xóa khỏi hệ thống  
* Sprint Board được cập nhật.

**Quy tắc:**

* Chỉ xóa SubTask khi không ảnh hưởng đến tính toàn vẹn báo cáo.

* Các sự kiện xóa luôn được ghi log để phục vụ truy vết.

**4\. Tạo Task từ Sprint**

**Actor:** Scrum Master, Product Owner (tùy quyền).

**Tiền điều kiện:**

* Đã tạo Sprint.

* Người thao tác có quyền tạo Task.

**Kích hoạt:**

* Chọn Sprint → bấm “Tạo Task” trên giao diện.

**Luồng chính:**

6. Hệ thống hiển thị form tạo Task, với các trường: tiêu đề, mô tả, trạng thái ban đầu, người phụ trách, thời gian dự kiến, file đính kèm (tùy chọn).

7. Người dùng nhập thông tin và xác nhận lưu.

8. Hệ thống tạo mới Task, gắn liên kết với Sprint tương ứng.

9. Cập nhật Sprint Board hiển thị Task mới ở trạng thái **To Do**.

10. Ghi log sự kiện và (nếu bật) gửi thông báo đến thành viên liên quan.

**Ngoại lệ/nhánh:**

* (E1) Không có quyền → 403\.

* (E2) thuộc Sprint đã kết thúc → không cho phép tạo Task mới.

* (E3) Thiếu thông tin bắt buộc → hiển thị lỗi, yêu cầu nhập bổ sung.

**Hậu điều kiện:**

* Task mới được tạo và liên kết với Sprint.

* Thông tin xuất hiện trên Sprint Board.

**Quy tắc:**

* Trạng thái mặc định khi tạo là **To Do**.

## **5\. Cập nhật trạng thái Task** 

**Actor:** Developer, Scrum Master.

**Tiền điều kiện:**

* Task tồn tại trong Sprint đang Active.

* Người thao tác có quyền cập nhật.

**Kích hoạt:**

* Thực hiện drag & drop trên Sprint Board hoặc cập nhật từ giao diện chi tiết Task.

**Luồng chính:**

4. Người dùng thay đổi trạng thái Task (To Do, In Progress, In Review, Done).

5. Hệ thống ghi nhận trạng thái mới, cập nhật trên Sprint Board và trong cơ sở dữ liệu.

6. Ghi log sự kiện và (nếu bật) gửi thông báo cho người liên quan.

**Ngoại lệ/nhánh:**

* (E1) Task thuộc Sprint đã Completed → chỉ cho phép đọc, không thay đổi.

* (E2) Không có quyền → 403\.

* (E3) Chuyển trạng thái không hợp lệ (ví dụ: từ Done quay về In Review nhưng Sprint đã kết thúc) → báo lỗi.

**Hậu điều kiện:**

* Trạng thái Task được cập nhật và đồng bộ cho tất cả người dùng.

**Quy tắc:**

* Chỉ các trạng thái trong quy trình (To Do → In Progress → In Review → Done) mới hợp lệ.

## **6\. Xóa Task**

**Actor:** Scrum Master, Product Owner.

**Tiền điều kiện:**

* Task tồn tại trong hệ thống.

* Người thao tác có quyền xóa Task.

**Kích hoạt:**

* Chọn Task → bấm “Xóa Task” trên giao diện.

**Luồng chính:**

7. Người dùng thực hiện thao tác xóa Task.

8. Hệ thống hiển thị hộp thoại xác nhận (Confirm).

9. Người dùng xác nhận xóa.

10. Hệ thống kiểm tra:

    * Task không thuộc Sprint đã hoàn thành.

11. Nếu hợp lệ, hệ thống xóa Task khỏi cơ sở dữ liệu và cập nhật Sprint Board.

12. Ghi log sự kiện và (nếu bật) gửi thông báo cho người liên quan.

**Ngoại lệ/nhánh:**

* (E1) Không có quyền → 403\.

* (E2) Task thuộc Sprint Completed → không cho phép xóa.

* (E3) Người dùng hủy thao tác ở bước xác nhận → không thực hiện gì.

* (E4) Task có dữ liệu ràng buộc (ví dụ: log tiến độ, comment quan trọng) → yêu cầu xác nhận bổ sung

**Hậu điều kiện:**

* Task bị xóa khỏi hệ thống  
* Sprint Board được cập nhật.

**Quy tắc:**

* Chỉ xóa Task khi không ảnh hưởng đến tính toàn vẹn báo cáo.

* Các sự kiện xóa luôn được ghi log để phục vụ truy vết.


**VII. Sprint Management**

### **1\. Tạo Sprint**

## **Mục đích:** Tạo một Sprint mới với thời gian dự kiến và giới hạn Story Point để lập kế hoạch.

## **Actor:** Product Owner, Scrum Master.

## **Pre-condition:**

* ## Product Owner hoặc Scrum Master đã đăng nhập với tài khoản có quyền tạo Sprint.

* ## Dự án đã được tạo trong hệ thống.

## **Luồng hoạt động:**

1. ## Vào module "Sprint" của dự án.

2. ## Nhấn nút "Tạo Sprint".

3. ## Nhập thông tin:

   * ## Tên Sprint: Ví dụ: "Sprint 1", "Sprint 2".

   * ## Thời gian bắt đầu dự kiến: Chọn ngày bắt đầu (dùng lịch popup).

   * ## Thời gian kết thúc dự kiến: Chọn ngày kết thúc (1–4 tuần sau ngày bắt đầu).

   * ## Mục tiêu Sprint: Nhập mô tả mục tiêu.

   * ## Story Point Limit (tùy chọn): Nhập số Story Point tối đa cho Sprint (dựa trên velocity của đội).

4. ## Hệ thống kiểm tra:

   * ## Đảm bảo thời gian dự kiến không giao với bất kỳ Sprint nào khác (kể cả Sprint đã active hoặc chưa active).

     * ## Nếu giao nhau, hiển thị lỗi: "Thời gian Sprint giao với Sprint \[tên Sprint\]. Vui lòng chọn thời gian khác."

   * ## Đảm bảo Story Point Limit là số không âm (nếu nhập).

5. ## Nhấn "Lưu" để tạo Sprint.

## **Post-condition:**

* ## Sprint được tạo với trạng thái “Not Started,” hiển thị trong danh sách Sprint của dự án.

* ## Story Point Limit (nếu có) được lưu để kiểm tra trong Sprint Planning.

* ## Hệ thống ghi nhận thời gian tạo và người tạo.

## **Điều kiện:**

* ## Thời gian bắt đầu dự kiến phải trước thời gian kết thúc dự kiến.

* ## Thời gian Sprint không được giao với Sprint khác.

* ## Story Point Limit phải là số không âm (nếu nhập).

### **2\. Bắt đầu Sprint**

## **Mục đích:** Kích hoạt một Sprint, ghi nhận thời gian bắt đầu thực tế và xác định thời lượng.

## **Actor:** Product Owner, Scrum Master.

## **Pre-condition:**

* ## Sprint đã được tạo với trạng thái “Not Started.”

* ## Không có Sprint nào khác đang active.

* ## Product Owner hoặc Scrum Master đã đăng nhập.

## **Luồng hoạt động:**

1. ## Vào module "Sprint" và chọn Sprint có trạng thái “Not Started.”

2. ## Nhấn nút “Bắt đầu Sprint.”

3. ## Hệ thống ghi nhận thời gian hiện tại (ví dụ: 11:00 PM \+07, 09/08/2025) làm thời gian bắt đầu thực tế.

4. ## Nhập thời lượng Sprint (ví dụ: 1 tuần, 2 tuần, tối đa 4 tuần).

5. ## Hệ thống tính thời gian kết thúc thực tế dựa trên thời gian bắt đầu và thời lượng.

6. ## Hệ thống kiểm tra: Đảm bảo thời gian thực tế không giao với Sprint khác.

   * ## Nếu giao nhau, hiển thị lỗi: "Thời gian Sprint giao với Sprint \[tên Sprint\]. Vui lòng chọn thời lượng khác."

7. ## Nhấn “Xác nhận” để kích hoạt Sprint.

## **Post-condition:**

* ## Sprint được chuyển sang trạng thái “Active.”

* ## Thời gian bắt đầu và kết thúc thực tế được cập nhật.

* ## Hệ thống ghi nhận thời gian kích hoạt và người thực hiện.

## **Điều kiện:**

* ## Chỉ một Sprint được active tại một thời điểm.

* ## Thời gian Sprint không được giao với Sprint khác.

### **3\. Chỉnh sửa Sprint**

## **Mục đích:** Cập nhật thời gian bắt đầu (nếu chưa active), thời gian kết thúc, mục tiêu, và Story Point Limit của Sprint.

## **Actor:** Product Owner, Scrum Master.

## **Pre-condition:**

* ## Sprint đã được tạo (trạng thái “Not Started” hoặc “Active”).

* ## Product Owner hoặc Scrum Master đã đăng nhập.

## **Luồng hoạt động:**

1. ## Vào module "Sprint" và chọn Sprint cần chỉnh sửa.

2. ## Nhấn nút “Chỉnh sửa Sprint.”

3. ## Cập nhật thông tin:

   * ## Nếu Sprint ở trạng thái “Not Started”:

     * ## Thời gian bắt đầu dự kiến: Chọn ngày bắt đầu mới.

     * ## Thời gian kết thúc dự kiến: Chọn ngày kết thúc mới (1–4 tuần sau ngày bắt đầu).

   * ## Nếu Sprint ở trạng thái “Active”:

     * ## Thời gian kết thúc thực tế: Chọn ngày kết thúc mới.

     * ## Thời gian bắt đầu thực tế không thể chỉnh sửa.

   * ## Mục tiêu Sprint: Cập nhật mô tả mục tiêu.

   * ## Story Point Limit (tùy chọn): Cập nhật số Story Point tối đa.

4. ## Hệ thống kiểm tra:

   * ## Đảm bảo thời gian cập nhật không giao với bất kỳ Sprint nào khác.

     * ## Nếu giao nhau, hiển thị lỗi: "Thời gian Sprint giao với Sprint \[tên Sprint\]. Vui lòng chọn thời gian khác."

   * ## Đảm bảo Story Point Limit là số không âm và không nhỏ hơn tổng Story Points của các User Story, Task, Bug hiện có trong Sprint (nếu có).

     * ## Nếu không thỏa, hiển thị lỗi: "Story Point Limit phải lớn hơn hoặc bằng tổng Story Points hiện tại (\[số điểm\])."

5. ## Nhấn “Lưu” để cập nhật.

## **Post-condition:**

* ## Thông tin Sprint được cập nhật (thời gian bắt đầu dự kiến nếu Not Started, thời gian kết thúc, mục tiêu, Story Point Limit).

* ## Hệ thống ghi nhận thời gian chỉnh sửa và người thực hiện.

## **Điều kiện:**

* ## Thời gian bắt đầu chỉ có thể chỉnh sửa nếu Sprint ở trạng thái “Not Started.”

* ## Thời gian cập nhật không được giao với Sprint khác.

* ## Story Point Limit phải là số không âm và đủ lớn để chứa các work item hiện có.

### **4\. Hủy Sprint**

## **Mục đích:** Hủy một Sprint và chuyển tất cả User Story, Task, Bug về Product Backlog.

## **Actor:** Product Owner, Scrum Master.

## **Pre-condition:**

* ## Sprint đã được tạo (trạng thái “Not Started” hoặc “Active”).

* ## Product Owner hoặc Scrum Master đã đăng nhập.

## **Luồng hoạt động:**

1. ## Vào module "Sprint" và chọn Sprint cần hủy.

2. ## Nhấn nút “Hủy Sprint.”

3. ## Hệ thống hiển thị xác nhận: “Bạn có chắc chắn muốn hủy Sprint \[tên Sprint\]? Tất cả User Story, Task, Bug sẽ được chuyển về Product Backlog.”

4. ## Nhấn “Xác nhận” để hủy hoặc “Hủy bỏ” để dừng.

5. ## Hệ thống chuyển tất cả User Story, Task, Bug trong Sprint về Product Backlog, cập nhật trạng thái thành “Backlog.”

## **Post-condition:**

* ## Sprint được xóa khỏi danh sách Sprint.

* ## Tất cả User Story, Task, Bug được chuyển về Product Backlog với trạng thái “Backlog.”

* ## Hệ thống ghi nhận thời gian hủy và người thực hiện.

## **Điều kiện:**

* ## Xác nhận bắt buộc trước khi hủy.

### **5\. Hoàn thành Sprint**

## **Mục đích:** Kết thúc một Sprint, xử lý các User Story, Task, Bug chưa hoàn thành bằng cách chuyển về Product Backlog hoặc Sprint kế tiếp (nếu có).

## **Actor:** Product Owner, Scrum Master.

## **Pre-condition:**

* ## Sprint đang ở trạng thái “Active.”

* ## Product Owner hoặc Scrum Master đã đăng nhập.

## **Luồng hoạt động:**

1. ## Vào module "Sprint" và chọn Sprint Active.

2. ## Nhấn nút “Hoàn thành Sprint.”

3. ## Hệ thống kiểm tra trạng thái của tất cả User Story, Task, Bug trong Sprint.

4. ## Nếu có User Story, Task, hoặc Bug chưa “Done”:

   * ## Hệ thống kiểm tra xem có Sprint “Not Started” kế tiếp không (dựa trên thời gian bắt đầu dự kiến gần nhất).

   * ## Hiển thị cửa sổ với các tùy chọn:

     * ## Chuyển về Product Backlog: Chuyển tất cả User Story, Task, Bug chưa hoàn thành về Product Backlog.

     * ## Chuyển sang Sprint kế tiếp (nếu có Sprint Not Started): Chuyển các mục chưa hoàn thành sang Sprint kế tiếp.

     * ## Nếu không có Sprint kế tiếp, chỉ hiển thị tùy chọn “Chuyển về Product Backlog.”

5. ## Người dùng chọn tùy chọn và nhấn “Xác nhận.”

6. ## Hệ thống:

   * ## Cập nhật trạng thái Sprint thành “Completed.”

   * ## Chuyển các mục chưa hoàn thành theo tùy chọn của người dùng:

     * ## Về Product Backlog: Cập nhật trạng thái thành “Backlog.”

     * ## Sang Sprint kế tiếp: Gán vào Sprint Not Started gần nhất, giữ trạng thái hiện tại.

   * ## Các mục “Done” được giữ nguyên (không chuyển).

## **Post-condition:**

* ## Sprint được chuyển sang trạng thái “Completed.”

* ## User Story, Task, Bug chưa hoàn thành được chuyển về Product Backlog hoặc Sprint kế tiếp theo lựa chọn.

* ## Hệ thống ghi nhận thời gian hoàn thành và người thực hiện.

## **Điều kiện:**

* ## Sprint phải ở trạng thái “Active.”

* ## Xác nhận bắt buộc nếu có mục chưa hoàn thành.

* ## Tùy chọn “Chuyển sang Sprint kế tiếp” chỉ hiển thị nếu có Sprint Not Started.

### **6\. Sprint Planning**

## **Mục đích:** Thêm User Story, Task, hoặc Bug từ Product Backlog hoặc tạo mới Task/Bug vào Sprint để thực hiện.

## **Actor:** Product Owner, Scrum Master, Development Team.

## **Pre-condition:**

* ## Sprint đã được tạo (trạng thái “Not Started” hoặc “Active”).

* ## Product Backlog chứa User Story, Task, hoặc Bug chưa hoàn thành và chưa gán vào Sprint khác.

* ## Tất cả thành viên tham gia Sprint Planning đã đăng nhập.

## **Luồng hoạt động:**

1. ## Vào module "Sprint" và chọn Sprint (Not Started hoặc Active).

2. ## Hiển thị danh sách User Story, Task, Bug từ Product Backlog (chỉ các mục chưa hoàn thành và chưa gán vào Sprint khác).

3. ## Thêm Work Item vào Sprint:

   * ## Chọn từ Product Backlog:

     * ## Chọn User Story, Task, hoặc Bug bằng cách kéo thả hoặc nhấn "Thêm vào Sprint."

   * ## Tạo mới Task/Bug (Các bước dưới có thể được thay đổi để tương đương với bước tạo Task bên backlog cho đồng bộ):

     * ## Nhấn “Tạo Work Item.”

     * ## Chọn loại: Task hoặc Bug.

     * ## Nhập thông tin:

       * ## Tiêu đề: Mô tả ngắn gọn (ví dụ: “Thiết kế giao diện,” “Sửa lỗi hiển thị”).

       * ## Mô tả: Chi tiết công việc.

       * ## Người phụ trách: Chọn thành viên nhóm.

       * ## Thời gian ước lượng: Nhập số giờ/ngày.

       * ## Story Point (tùy chọn): Nhập điểm phức tạp (ví dụ: 1, 2, 3, 5, 8, 13, 21 theo thang Fibonacci).

     * ## Nhấn “Lưu” để tạo và thêm vào Sprint.

4. ## Hệ thống kiểm tra:

   * ## Nếu có Story Point Limit, tính tổng Story Points của tất cả User Story, Task, Bug trong Sprint (bao gồm mục đang thêm).

   * ## Nếu tổng vượt Story Point Limit, hiển thị lỗi: “Tổng Story Point (\[số điểm\]) vượt quá giới hạn Sprint (\[limit\]).”

5. ## Nhấn “Lưu” (cho mục từ Backlog) hoặc lặp lại bước 3–4 nếu cần.

## **Post-condition:**

* ## User Story, Task, hoặc Bug được thêm vào Sprint, trạng thái cập nhật thành “Đang thực hiện” (nếu Sprint Active).

* ## Tổng Story Points của Sprint được cập nhật, không vượt quá Story Point Limit (nếu có).

* ## Hệ thống ghi nhận thời gian và người thực hiện.

## **Điều kiện:**

* ## User Story, Task, Bug từ Product Backlog phải chưa hoàn thành và chưa gán vào Sprint khác.

* ## Task/Bug mới phải có tiêu đề và người phụ trách.

* ## Tổng Story Points không được vượt Story Point Limit (nếu có).

## 

**D. Bổ sung(nếu có thể)**

## **1\. Quản lý tài liệu (Document Management)**

* Kho lưu trữ tài liệu tập trung (project-wide document repository).

* Phân quyền chi tiết (ai được xem / sửa / tải về / bình luận).

* Phiên bản tài liệu (versioning) để theo dõi thay đổi.

* Tìm kiếm thông minh trong nội dung tài liệu (full-text search).

* Tag & phân loại tài liệu theo dự án, module, hoặc loại file.

* Bình luận trực tiếp trên tài liệu.

* Liên kết tài liệu với task hoặc milestone.

## **2\. Quản lý Source Code (Code Management)**

* Liên kết task với branch/commit từ GitHub/GitLab/Bitbucket.

* Lưu metadata commit (commit message, tác giả, thời gian, branch) và link đến commit/PR trên GitHub/GitLab.

* Tích hợp API để lấy trạng thái PR/MR (Open, Merged, Closed) và hiển thị trong task.

* Tự động gắn branch name với task ID khi dev push code (feature/PROJECT-123).

**3\. Tính năng custom workflow**

* Tạo và chỉnh sửa quy trình

* **Drag & drop** các bước công việc (task states) như: "Backlog" → "In Progress" → "Review" → "Done"

* **Tùy chỉnh tên bước**, màu sắc, biểu tượng.

* **Vẽ mũi tên kết nối** để xác định luồng chuyển đổi (transition) giữa các bước.

* **Thiết lập điều kiện chuyển bước** (ví dụ: chỉ PM mới được chuyển từ "Review" sang "Done").

* **Tạo nhiều flow** (parallel flow) hoặc rẽ nhánh (conditional path).

* Quản lý trạng thái & điều kiện

* Gắn **quyền hạn** cho từng trạng thái (ai được tạo, ai được duyệt).

* Thiết lập **automation rule** (VD: nếu task ở trạng thái "In Review" quá 3 ngày → tự động gán lại cho QA).

* Kích hoạt **hook** hoặc **webhook** khi chuyển bước (để chạy script, gửi thông báo Slack, tạo branch Git tự động…).

* Tích hợp với task

* Khi tạo task mới, người dùng chọn workflow áp dụng.

* Task sẽ **chỉ có thể** di chuyển theo luồng đã định (ngăn tình trạng skip bước).

* Hiển thị **timeline của task** dựa trên workflow (ai chuyển, khi nào).

**4\. AI và tự động hóa**

* Chatbot tìm kiếm thông tin dự án  
* Chatbot hỗ trợ xây dựng dự án  
* AI gợi ý đánh giá story point, gợi ý assignee  
* Tự động hóa các quy trình sprint review, retrospective, tự động chuyển trạng thái, …
