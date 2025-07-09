'use client'
import { useEffect } from "react"
import * as Ably from 'ably';

export default function AblyNotifListener({userId}) {
    useEffect(()=>{
     if(!userId) console.log('tidak ada userId');
     
     const ably = new Ably.Realtime('o6L5Pw.vL0gaw:xwsuiBC96J9CP0hjFCqv7m8SUimqa7fsZCsVf_pG09w');
     const channel = ably.channels.get(`user-${userId}`);
     
     channel.subscribe('notification',(msg)=>{
        console.log('Notification diterima',msg.data);
        alert(`Notification: ${msg.data.title}\n${msg.data.body}`);
     });

     return ()=>{
        channel.unsubscribe();
        // ably.close();
     }
    },[userId]);

    return null;
}