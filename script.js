let riwayatTransaksi = [];

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// Fungsi utama untuk mencatat transaksi
function catatTransaksi(jenis) {
    const jumlahInput = document.getElementById('jumlah');
    const deskripsiInput = document.getElementById('deskripsi');

    const jumlah = parseFloat(jumlahInput.value);
    const deskripsi = deskripsiInput.value.trim();

    if (isNaN(jumlah) || jumlah <= 0) {
        alert("Jumlah harus diisi dengan angka positif.");
        return;
    }
    if (deskripsi === "") {
        alert("Keterangan harus diisi.");
        return;
    }

    riwayatTransaksi.push({
        jenis: jenis,
        jumlah: jumlah,
        deskripsi: deskripsi
    });

    // Reset formulir
    jumlahInput.value = '';
    deskripsiInput.value = '';

    // Update tampilan
    updateUI();
}

// Fungsi untuk menghitung dan menampilkan saldo serta riwayat
function updateUI() {
    let saldo = 0;
    const riwayatList = document.getElementById('riwayat-list');
    riwayatList.innerHTML = ''; // Kosongkan riwayat yang lama

    // 1. Hitung Saldo dan Buat Elemen Riwayat
    riwayatTransaksi.forEach(t => {
        if (t.jenis === 'Pemasukan') {
            saldo += t.jumlah;
        } else {
            saldo -= t.jumlah;
        }

        const listItem = document.createElement('li');
        
        const kelas = t.jenis === 'Pemasukan' ? 'pemasukan' : 'pengeluaran';
        const simbol = t.jenis === 'Pemasukan' ? '➕' : '➖';

        listItem.innerHTML = `
            <span>${simbol} ${t.deskripsi}</span>
            <span class="${kelas}">${formatRupiah(t.jumlah)}</span>
        `;
        riwayatList.appendChild(listItem);
    });

    // 2. Tampilkan Saldo Akhir
    document.getElementById('saldo').textContent = formatRupiah(saldo);
}

// Inisialisasi tampilan saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateUI);
