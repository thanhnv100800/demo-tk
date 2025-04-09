document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("data.txt");
        const text = await response.text();
        document.getElementById("dataContent").value = text;
    } catch (error) {
        console.error("Lỗi khi tải data.txt:", error);
    }
});

async function updateData() {
    const newData = document.getElementById("dataContent").value;
    const repo = "username/repository"; // Thay bằng tên repo của bạn
    const filePath = "data.txt";
    const token = "YOUR_GITHUB_TOKEN"; // Tạo token cá nhân trên GitHub

    // Lấy SHA của file hiện tại để cập nhật
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: {
            "Authorization": `token ${token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });
    const fileData = await response.json();
    
    // Cập nhật nội dung file
    const updateResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Cập nhật data.txt",
            content: btoa(newData), // Chuyển đổi dữ liệu thành Base64
            sha: fileData.sha
        })
    });

    if (updateResponse.ok) {
        document.getElementById("status").textContent = "Cập nhật thành công!";
    } else {
        document.getElementById("status").textContent = "Lỗi khi cập nhật!";
    }
}
