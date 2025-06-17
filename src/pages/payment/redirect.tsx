import { useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";

export default function PaymentRedirectPage() {
  const router = useRouter();
  const { external_id } = router.query;

  useEffect(() => {
    const checkStatus = async ()=>{
        try {
            const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/nota?external_id=${external_id}`);
            const status = response.data.nota?.status;
            
            if(['settlement','perlu diproses'].includes(status)){
                router.replace(`/payment/success?external_id=${external_id}`);
            }else{
                router.replace(`/payment/failed?external_id=${external_id}`);
            }
        } catch {
            router.replace(`/payment/failed?external_id=${external_id}`);
        }
    }
    if(external_id) checkStatus();

  },[external_id]);
}
