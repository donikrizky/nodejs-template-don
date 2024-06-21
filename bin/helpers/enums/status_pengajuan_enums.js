const STATUS_PENGAJUAN = Object.freeze({
    SELESAI: 'selesai',
    DRAFT: 'draft',
    MENUNGGU_VERIFIKASI: 'menunggu_verifikasi',
    MENUNGGU_VERIFIKASI_VENUE: 'menunggu_verifikasi_venue',
    MENUNGGU_VERIFIKASI_DISPAREKRAF: 'menunggu_verifikasi_disparekraf',
    MENUNGGU_VERIFIKASI_POLRI: 'menunggu_verifikasi_polri',
    MENUNGGU_PEMBAYARAN: 'menunggu_pembayaran',
    MENUNGGU_SURAT_IZIN: 'menunggu_surat_izin',
    DIBATALKAN_VENUE: 'dibatalkan_venue',
    DIBATALKAN_DISPAREKRAF: 'dibatalkan_disparekraf',
    DIBATALKAN_POLRI: 'dibatalkan_polri'
});

const STATUS_PENGAJUAN_LIST = Object.freeze(Object.values(STATUS_PENGAJUAN));

const LEMBAGA = Object.freeze({
    DISPAREKRAF: 'disparekraf',
    POLRI: 'polri'
})
module.exports = {
    STATUS_PENGAJUAN,
    STATUS_PENGAJUAN_LIST,
    LEMBAGA
};