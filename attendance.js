let jsonData = null;

// ✅ 确保在 DOM 加载完成后再执行 JS 代码
document.addEventListener("DOMContentLoaded", function () {
    loadJsonData(); // 加载 JSON
});

// ✅ 使用 async/await 确保数据加载完成
async function loadJsonData() {
    try {
        const response = await fetch("./data.json"); // 请确保路径正确
        jsonData = await response.json();
        console.log("JSON 数据加载成功", jsonData);
    } catch (error) {
        console.error("Error loading JSON file:", error);
    }
}

document.getElementById("idform").addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止表单提交

    if (!jsonData) {
        alert("数据尚未加载完成，请再试试！");
        return;
    }

    var ID = document.getElementById("ID").value.trim(); // ✅ 修正输入
    if (ID === "") {
        alert("请输入 ID！");
        return;
    }

    let name = "";
    for (let i = 0; i < jsonData.data.length; i++) {
        if (jsonData.data[i].ID == ID) {
            name = jsonData.data[i].name;
            break;
        }
    }

    if (name === "") {
        alert("ID not found!");
        return;
    }

    let currentTime = new Date();
    const date = currentTime.toLocaleDateString("en-GB");
    const time = currentTime.toLocaleTimeString();

    document.getElementById("ID").value = ""; // 清空输入框

    // ✅ 确保 `attendance` 表格存在
    const attendanceTable = document.getElementById("attendance");
    if (!attendanceTable) {
        console.error("Element with ID 'attendance' not found.");
        return;
    }
    
    const newRow = attendanceTable.insertRow();
    newRow.innerHTML = `<td>${ID}</td><td>${name}</td><td>${date}</td><td>${time}</td>`;
});

// ✅ 修正 reset 逻辑
document.getElementById("reset").addEventListener("click", function() {
    alert("Your attendance records have been cleared!");
    document.getElementById("attendance").innerHTML = "";
});