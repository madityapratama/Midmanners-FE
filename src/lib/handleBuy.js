import axios from 'axios';

export async function handleBuy(postId) {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${postId}`,
      {}, // body kosong
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Redirect ke Xendit
    window.location.href = response.data.invoice_url;
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message || 'Terjadi kesalahan saat membuat pesanan.';
    alert(message);
  }
}
