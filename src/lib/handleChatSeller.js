import api from "@/lib/axios"

export async function handleChatSeller(id){
    try {
        const response = await api.post(`${process.env.NEXT_PUBLIC_API}/create-or-get-chat`,)
    } catch (error) {
        alert("Gagal memulai chat");
    }
}

