document.addEventListener('DOMContentLoaded', function() {
    // Initialize attendance chart
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const stats = {
        hadir: parseInt(document.querySelector('.stat-item:nth-child(1) span').textContent.split(': ')[1]),
        terlambat: parseInt(document.querySelector('.stat-item:nth-child(2) span').textContent.split(': ')[1]),
        sakit: parseInt(document.querySelector('.stat-item:nth-child(3) span').textContent.split(': ')[1]),
        izin: parseInt(document.querySelector('.stat-item:nth-child(4) span').textContent.split(': ')[1]),
        alfa: parseInt(document.querySelector('.stat-item:nth-child(5) span').textContent.split(': ')[1])
    };

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Hadir', 'Terlambat', 'Sakit', 'Izin', 'Alfa'],
            datasets: [{
                data: [stats.hadir, stats.terlambat, stats.sakit, stats.izin, stats.alfa],
                backgroundColor: [
                    '#28a745',
                    '#ffc107',
                    '#17a2b8',
                    '#007bff',
                    '#dc3545'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Statistik Kehadiran Bulan Ini'
                }
            }
        }
    });

    // Handle attendance saving
    document.querySelectorAll('.save-attendance').forEach(button => {
        button.addEventListener('click', async function() {
            const studentId = this.dataset.studentId;
            const status = document.querySelector(`.attendance-status[data-student-id="${studentId}"]`).value;
            const notes = document.querySelector(`.attendance-notes[data-student-id="${studentId}"]`).value;
            const today = new Date().toISOString().split('T')[0];

            try {
                const response = await fetch('/attendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        studentId,
                        date: today,
                        status,
                        notes
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        alert('Absensi berhasil disimpan!');
                        location.reload();
                    }
                } else {
                    throw new Error('Gagal menyimpan absensi');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan absensi');
            }
        });
    });

    // Handle bulk attendance saving
    const saveAllButton = document.createElement('button');
    saveAllButton.className = 'btn btn-success mt-3';
    saveAllButton.textContent = 'Simpan Semua Absensi';
    document.querySelector('.table-responsive').appendChild(saveAllButton);

    saveAllButton.addEventListener('click', async function() {
        const today = new Date().toISOString().split('T')[0];
        const records = [];

        document.querySelectorAll('.attendance-status').forEach(select => {
            const studentId = select.dataset.studentId;
            const status = select.value;
            const notes = document.querySelector(`.attendance-notes[data-student-id="${studentId}"]`).value;

            records.push({
                studentId,
                status,
                notes
            });
        });

        try {
            const response = await fetch('/attendance/bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: today,
                    records
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert('Semua absensi berhasil disimpan!');
                    location.reload();
                }
            } else {
                throw new Error('Gagal menyimpan absensi');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menyimpan absensi');
        }
    });
}); 