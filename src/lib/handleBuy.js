import api from './api';

export async function handleBuy(postId) {
  try {

    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${postId}`,
      {}, // body kosong
    );

    // Redirect ke Xendit
    window.location.href = response.data.invoice_url;
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message || 'Terjadi kesalahan saat membuat pesanan.';
    alert(message);
  }
}
