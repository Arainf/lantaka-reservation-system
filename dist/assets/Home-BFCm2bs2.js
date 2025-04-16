import{j as e,r as c,u as Z}from"./index-D5vEyPHo.js";import{N as ee}from"./clientNavigationTop-B6zx-apZ.js";import{L as te}from"./DJI_0205-BSXQR-DW.js";import{C as v,g as N,h as I,i as R,l as se,m as re}from"./NotificationBell-BTbLSTBQ.js";import{c as $,f as z,B as b}from"./createLucideIcon-8mYcU7v_.js";import{S as G,a as H,b as W,c as J,d as k}from"./select-DQ9Ul_4x.js";import{S as P}from"./scroll-area-uXoW3jqd.js";import{T as Y,a as K,b as Q,c as X}from"./tooltip-D88UY_EB.js";import{m as q,n as F,o as V,i as M,U as A,e as ae,p as ne,b as oe}from"./App-Djhw_SJK.js";import{S as ie}from"./routes-B8Fxvvtg.js";import{D as O,f as L,a as E}from"./dialog-C3s8z_XE.js";import{c as le,d as ce}from"./index-BhiIR7t5.js";import{a as de}from"./index-L6YSZLy6.js";import"./toast-4AJFHnBj.js";import{S as B}from"./search-B77jdn07.js";import{X as U}from"./index-BxHjqAeQ.js";import{T as me}from"./toaster-DeKnBLXS.js";import{D as ue,P as he,a as xe,b as pe}from"./popover-DvQgYgpX.js";import{C as fe}from"./chevron-left-CITwkm69.js";import{C as ge}from"./chevron-right-BAR7VKsc.js";import"./loader-circle-BuNOI4_W.js";import"./Combination-CrfrviD1.js";import"./index-ByrSLeMy.js";import"./iconBase-Kpgs8Efe.js";function je({className:u,classNames:f,showOutsideDays:h=!0,disablePast:g=!1,...o}){const p=x=>g?x<new Date(new Date().setHours(0,0,0,0)):!1;return e.jsx(ue,{showOutsideDays:h,className:$("p-3",u),classNames:{months:"flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",month:"space-y-4",caption:"flex justify-center pt-1 relative items-center",caption_label:"text-sm font-medium",nav:"space-x-1 flex items-center",nav_button:$(z({variant:"outline"}),"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),nav_button_previous:"absolute left-1",nav_button_next:"absolute right-1",table:"w-full border-collapse space-y-1",head_row:"flex",head_cell:"text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",row:"flex w-full mt-2",cell:$("relative p-0 text-center text-sm focus-within:relative focus-within:z-20",o.mode==="range"?"[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md":"[&:has([aria-selected])]:rounded-md"),day:$(z({variant:"ghost"}),"h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground","data-[selected]:bg-primary data-[selected]:text-primary-foreground","aria-selected:bg-primary aria-selected:text-primary-foreground","focus:bg-primary focus:text-primary-foreground","[&:not([aria-selected]):hover]:bg-accent [&:not([aria-selected]):hover]:text-accent-foreground"),day_range_start:"day-range-start rounded-l-md",day_range_end:"day-range-end rounded-r-md",day_selected:"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",day_today:"bg-accent text-accent-foreground",day_outside:"text-muted-foreground opacity-50",day_disabled:"text-muted-foreground opacity-50",day_range_middle:$("aria-selected:bg-secondary-foreground/50","aria-selected:text-foreground","hover:bg-accent hover:text-accent-foreground","relative before:absolute before:inset-0 before:bg-accent/20 before:content-['']"),day_hidden:"invisible",...f},components:{IconLeft:({...x})=>e.jsx(fe,{className:"h-4 w-4"}),IconRight:({...x})=>e.jsx(ge,{className:"h-4 w-4"})},disabled:p,...o})}function ve(){const[u,f]=c.useState(new Date),[h,g]=c.useState(window.innerWidth>=1920);c.useEffect(()=>{const x=setInterval(()=>{f(new Date)},1e3),j=()=>{g(window.innerWidth>=1920)};return window.addEventListener("resize",j),()=>{clearInterval(x),window.removeEventListener("resize",j)}},[]),c.useEffect(()=>{const x=setInterval(()=>{f(new Date)},1e3);return()=>{clearInterval(x)}},[]);const o=x=>x.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=x=>x.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"});return e.jsx(v,{className:"w-full h-full flex flex-col text-white border-none max-w-md bg-transparent justify-center items-center align-middle",children:e.jsxs(N,{className:"flex flex-col items-center",children:[e.jsx("div",{className:"flex items-center justify-center align-middle ",children:e.jsx("span",{className:"font-bold",style:{fontSize:h?"4rem":"2.5rem"},children:p(u)})}),e.jsx("div",{className:"flex items-center m-0",children:e.jsx("span",{style:{fontSize:h?"1.5rem":"1rem"},children:o(u)})})]})})}const ye=()=>{const{data:u,isLoading:f,error:h,calendarReservations:g,selectedDate:o}=q(),[p,x]=c.useState("rooms"),[j,m]=c.useState("all");if(f)return e.jsx(ie,{});if(h)return e.jsx("div",{className:"flex items-center justify-center min-h-[200px] text-red-600",children:e.jsxs("p",{className:"text-center",children:[e.jsx("span",{className:"block text-lg font-semibold",children:"Error"}),e.jsx("span",{className:"block mt-1",children:h.message})]})});if(!u)return e.jsx("div",{className:"flex items-center justify-center min-h-[200px] text-gray-500",children:e.jsxs("p",{className:"text-center",children:[e.jsx("span",{className:"block text-lg font-semibold",children:"No Data"}),e.jsx("span",{className:"block mt-1",children:"No data available at the moment"})]})});const w=i=>({ready:"bg-green-200",waiting:"bg-yellow-200",onUse:"bg-blue-200",cancelled:"bg-red-200",done:"bg-purple-200",onCleaning:"bg-orange-200"})[i]||"text-gray-800",C=i=>({ready:"bg-green-200 text-green-800",waiting:"bg-yellow-200 text-yellow-800",onUse:"bg-blue-200 text-blue-800",cancelled:"bg-red-200 text-red-800",done:"bg-purple-200 text-purple-800",onCleaning:"bg-orange-200 text-orange-800"})[i]||"bg-gray-100",_=i=>g==null?void 0:g.some(t=>t.id===i&&F(o,"yyyy-MM-dd")>=t.dateStart&&F(o,"yyyy-MM-dd")<=t.dateEnd),y=i=>g&&_(i.room_id)?g.find(a=>a.id===i.room_id).status:i.status,l=({room:i})=>{const t=y(i);return e.jsx(Y,{children:e.jsxs(K,{children:[e.jsx(Q,{asChild:!0,children:e.jsx(v,{className:`p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer relative overflow-hidden ${C(t)}`,children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"font-semibold truncate",children:i.room_name}),e.jsx("div",{className:`text-xs font-medium ${w(t)}`,children:t||cleaningTime})]})})}),e.jsx(X,{side:"right",className:"w-80 p-0",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-semibold text-lg",children:i.room_name}),e.jsxs("p",{className:"text-sm text-gray-500",children:[e.jsx("strong",{children:"Status:"})," ",t]}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Is Ready:"})," ",i.room_isready?"Yes":"No"]}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Room Status:"})," ",i.room_status?"Occupied":"Available"]}),_(i.room_id)?e.jsxs("div",{className:"mt-2 pt-2 border-t",children:[e.jsx("p",{className:"text-sm font-semibold",children:"Reservation Details:"}),g.filter(a=>a.id===i.room_id).map(a=>e.jsxs("div",{className:"text-sm",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Guest:"})," ",a.guests]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Check In:"})," ",a.checkIn]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Check Out:"})," ",a.checkOut]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date:"})," ",a.dateStart," - ",a.dateEnd]})]},a.reservationid))]}):e.jsx("div",{children:e.jsx("p",{className:"text-sm",children:"No reservations found for this Room."})})]})})]})})},T=({venue:i})=>{const t=y(i);return e.jsx(Y,{children:e.jsxs(K,{children:[e.jsx(Q,{asChild:!0,children:e.jsx(v,{className:`p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer relative overflow-hidden ${C(t)}`,children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"font-semibold truncate",children:i.room_name}),e.jsx("div",{className:`text-xs font-medium ${w(t)}`,children:t})]})})}),e.jsx(X,{side:"right",className:"w-80 p-0",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-semibold text-lg",children:i.room_name}),e.jsxs("p",{className:"text-sm text-gray-500",children:[e.jsx("strong",{children:"Status:"})," ",t]}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Is Ready:"})," ",i.room_isready?"Yes":"No"]}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Venue Status:"})," ",i.room_status?"Occupied":"Available"]}),_(i.room_id)?e.jsxs("div",{className:"mt-2 pt-2 border-t",children:[e.jsx("p",{className:"text-sm font-semibold",children:"Reservation Details:"}),g.filter(a=>a.id===i.room_id).map(a=>e.jsxs("div",{className:"text-sm",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Guest:"})," ",a.guests]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Check In:"})," ",a.checkIn]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Check Out:"})," ",a.checkOut]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Date:"})," ",a.dateStart," - ",a.dateEnd]})]},a.reservationid))]}):e.jsx("div",{children:e.jsx("p",{className:"text-sm",children:"No reservations found for this Venue."})})]})})]})})},D=()=>{if(p==="venues")return e.jsx(P,{className:"h-[calc(100vh-300px)]",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:u.venues_holder.map(t=>e.jsx(T,{venue:t},t.room_id))})});let i=[];return j==="all"?i=[...u.double_rooms,...u.triple_rooms,...u.matrimonial_rooms]:j==="double"?i=u.double_rooms:j==="triple"?i=u.triple_rooms:j==="matrimonial"&&(i=u.matrimonial_rooms),e.jsx(P,{className:"h-[calc(100vh-300px)]",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",children:i.map(t=>e.jsx(l,{room:t},t.room_id))})})};return e.jsxs("div",{className:"space-y-6 p-4 sm:p-6 lg:p-8",children:[e.jsxs("div",{className:"flex gap-4",children:[e.jsxs(G,{value:p,onValueChange:x,children:[e.jsx(H,{className:"w-[180px]",children:e.jsx(W,{placeholder:"Select category"})}),e.jsxs(J,{children:[e.jsx(k,{value:"rooms",children:"Rooms"}),e.jsx(k,{value:"venues",children:"Venues"})]})]}),p==="rooms"&&e.jsxs(G,{value:j,onValueChange:m,children:[e.jsx(H,{className:"w-[180px]",children:e.jsx(W,{placeholder:"Select room type"})}),e.jsxs(J,{children:[e.jsx(k,{value:"all",children:"All Rooms"}),e.jsx(k,{value:"double",children:"Double"}),e.jsx(k,{value:"triple",children:"Triple"}),e.jsx(k,{value:"matrimonial",children:"Matrimonial"})]})]})]}),D()]})};function be({data:u=[],onClose:f}){const[h,g]=c.useState("all"),[o,p]=c.useState(0),[x,j]=c.useState("newest"),[m,w]=c.useState(""),{toast:C}=V(),{createNotification:_}=M(),{userData:y}=c.useContext(A),l=c.useMemo(()=>{let t=u.filter(r=>r.status==="ready");m&&(t=t.filter(r=>r.guest_name.toLowerCase().includes(m.toLowerCase())||r.guest_email.toLowerCase().includes(m.toLowerCase()))),h!=="all"&&(t=t.filter(r=>h==="room"?r.reservation_type==="room":h==="venue"?r.reservation_type==="venue":!0));const a=t.reduce((r,s)=>{const n=`${s.guest_name}-${s.guest_email}-${s.reservation_type}-${s.receipt_total_amount}-${s.receipt_id}-${s.timestamp}`;return r[n]||(r[n]={guestId:s.guest_id,guestName:s.guest_name,guestEmail:s.guest_email,guestType:s.guest_type,reservationType:s.reservation_type,receiptDate:s.receipt_date,receiptTotal:s.receipt_total_amount,receiptSubTotal:s.receipt_initial_total,additionalNotes:s.additional_notes,receiptDiscounts:[],reservations:[],reservationRoomID:[],reservationVenueID:[]}),s.receipt_discounts.forEach(d=>{d&&!r[n].receiptDiscounts.some(S=>S.discount_id===d.discount_id)&&r[n].receiptDiscounts.push(d)}),s.reservation_type==="room"?r[n].reservationRoomID.push(s.reservation_id):s.reservation_type==="venue"?r[n].reservationVenueID.push(s.reservation_id):s.reservation_type==="both"&&(s.room_type?r[n].reservationRoomID.push(s.reservation_id):r[n].reservationVenueID.push(s.reservation_id)),r[n].reservations.push(s),r},{});return Object.values(a).sort((r,s)=>{const n=new Date(r.receiptDate),d=new Date(s.receiptDate);return x==="newest"?d.getTime()-n.getTime():n.getTime()-d.getTime()})},[u,h,x,m]),T=()=>{o<l.length-1&&p(o+1)},D=()=>{o>0&&p(o-1)},i=async()=>{if(console.log("Clicked"),!l[o])return;const t=l[o];if(t)try{const a={guest_id:t.guestId,status:"onUse",type:t.reservationType};if(t.reservationType==="room")a.reservation_room_ids=t.reservationRoomID;else if(t.reservationType==="venue")a.reservation_venue_ids=t.reservationVenueID;else if(t.reservationType==="both")a.reservation_room_ids=t.reservationRoomID,a.reservation_venue_ids=t.reservationVenueID;else throw new Error("Invalid reservation type.");console.log("Sending status update:",a);const r=await fetch("http://localhost:5000/api/change_status",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!r.ok)throw new Error("Failed to update reservation status.");const s=await r.json();C({title:"Check In Successful",description:"Reservation has been successfully checked-in.",variant:"success"});let n=y.first_name+" "+y.last_name;const d=new Date().toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});_({type:"Modified",description:`Employee account "${n}" has check-in reservation ids: {"${t.reservationRoomID||t.reservationVenueID}" } - Timestamp: "${d}".`,role:"Administrator"}),f()}catch{C({title:"Check In Failed",description:"Failed to check-in. Please try again.",variant:"destructive"})}};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(v,{children:e.jsx(N,{className:"p-4",children:e.jsxs("div",{className:"flex flex-row gap-10 justify-between",children:[e.jsx("div",{className:"bg-white rounded-lg border border-white/30 ",children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",placeholder:"Search by name or account...",value:m,onChange:t=>w(t.target.value),className:"pl-10 pr-4 py-2 w-60 md:w-80 border-2 text-black border-black bg-transparent rounded-3xl focus:outline-none focus:border-black"}),e.jsx("div",{className:"absolute inset-y-0 left-2 flex items-center pointer-events-none",children:e.jsx(B,{className:"text-black",size:18})})]})}),e.jsx("button",{onClick:f,className:"text-white text-lg font-bold bg-red-500",children:e.jsx(U,{className:"h-4 w-4"})})]})})}),e.jsxs(v,{children:[e.jsx(I,{className:"pl-6 pb-2",children:e.jsxs(R,{children:[" Check-In Guest "," ",e.jsxs("span",{className:"ml-2 text-sm text-gray-500",children:["(",l.length," to check-in)"]})," "]})}),e.jsx(N,{children:m?e.jsx("div",{className:"space-y-4",children:l.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(v,{className:"cursor-pointer hover:shadow-lg transition-shadow",children:[e.jsx(N,{className:"p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"font-semibold",children:l[o].guestName}),e.jsx(b,{onClick:i,children:"Check-In"})]})}),e.jsx(P,{className:"h-[100px] m-2 border rounded",children:l[o].reservations.map((t,a)=>e.jsx("div",{className:"mb-2 p-2 bg-gray-50 rounded",children:e.jsx("p",{className:"font-medium",children:t.reservation||`Reservation ${a+1}`})},a))}),e.jsxs("div",{className:"text-sm text-muted-foreground m-2 ",children:[Math.min(o+1,l.length)," of"," ",l.length," entries"]})]}),e.jsxs("div",{className:"flex justify-between mt-4",children:[e.jsx(b,{onClick:D,disabled:o===0,children:"Prev"}),e.jsx(b,{onClick:T,disabled:o===l.length-1,children:"Next"})]})]}):e.jsx("div",{className:"border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300",children:e.jsxs("p",{className:"text-gray-500 text-center m-20",children:['No reservations found for "',m,'"']})})}):e.jsx("div",{className:"border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300",children:e.jsx("p",{className:"text-gray-500 text-center m-20 ",children:"Start searching to view reservations."})})})]})]})})}function Ne({data:u=[],onClose:f}){const[h,g]=c.useState("all"),[o,p]=c.useState(0),[x,j]=c.useState("newest"),[m,w]=c.useState(""),{toast:C}=ae(),{createNotification:_}=M(),{userData:y}=c.useContext(A),l=c.useMemo(()=>{let t=u.filter(r=>r.status==="onUse");m&&(t=t.filter(r=>r.guest_name.toLowerCase().includes(m.toLowerCase())||r.guest_email.toLowerCase().includes(m.toLowerCase()))),h!=="all"&&(t=t.filter(r=>h==="room"?r.reservation_type==="room":h==="venue"?r.reservation_type==="venue":!0));const a=t.reduce((r,s)=>{const n=`${s.guest_name}-${s.guest_email}-${s.reservation_type}-${s.receipt_total_amount}-${s.receipt_id}-${s.timestamp}`;return r[n]||(r[n]={guestId:s.guest_id,guestName:s.guest_name,guestEmail:s.guest_email,guestType:s.guest_type,reservationType:s.reservation_type,receiptDate:s.receipt_date,receiptTotal:s.receipt_total_amount,receiptSubTotal:s.receipt_initial_total,additionalNotes:s.additional_notes,receiptDiscounts:[],reservations:[],reservationRoomID:[],reservationVenueID:[]}),s.receipt_discounts.forEach(d=>{d&&!r[n].receiptDiscounts.some(S=>S.discount_id===d.discount_id)&&r[n].receiptDiscounts.push(d)}),s.reservation_type==="room"?r[n].reservationRoomID.push(s.reservation_id):s.reservation_type==="venue"?r[n].reservationVenueID.push(s.reservation_id):s.reservation_type==="both"&&(s.room_type?r[n].reservationRoomID.push(s.reservation_id):r[n].reservationVenueID.push(s.reservation_id)),r[n].reservations.push(s),r},{});return Object.values(a).sort((r,s)=>{const n=new Date(r.receiptDate),d=new Date(s.receiptDate);return x==="newest"?d.getTime()-n.getTime():n.getTime()-d.getTime()})},[u,h,x,m]),T=()=>{o<l.length-1&&p(o+1)},D=()=>{o>0&&p(o-1)},i=async()=>{if(console.log("Clicked"),!l[o])return;const t=l[o];if(t)try{const a={guest_id:t.guestId,status:"onCleaning",type:t.reservationType};if(t.reservationType==="room")a.reservation_room_ids=t.reservationRoomID;else if(t.reservationType==="venue")a.reservation_venue_ids=t.reservationVenueID;else if(t.reservationType==="both")a.reservation_room_ids=t.reservationRoomID,a.reservation_venue_ids=t.reservationVenueID;else throw new Error("Invalid reservation type.");console.log("Sending status update:",a);const r=await fetch("http://localhost:5000/api/change_status",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!r.ok)throw new Error("Failed to update reservation status.");const s=await r.json();C({title:"Payment Successful",description:"Reservation has been successfully paid.",variant:"success"});let n=y.first_name+" "+y.last_name;const d=new Date().toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});_({type:"Modified",description:`Account Name: "${n}" has checked out with reservation IDs: {"${t.reservationRoomID||t.reservationVenueID}"} - Timestamp: "${d}".`,role:"Administrator"}),f()}catch{C({title:"Payment Failed",description:"Failed to process the payment. Please try again.",variant:"destructive"})}};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(v,{children:e.jsx(N,{className:"p-4",children:e.jsxs("div",{className:"flex flex-row gap-10 justify-between",children:[e.jsx("div",{className:"bg-white rounded-lg border border-white/30 ",children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",placeholder:"Search by name or account...",value:m,onChange:t=>w(t.target.value),className:"pl-10 pr-4 py-2 w-60 md:w-80 border-2 text-black border-black bg-transparent rounded-3xl focus:outline-none focus:border-black"}),e.jsx("div",{className:"absolute inset-y-0 left-2 flex items-center pointer-events-none",children:e.jsx(B,{className:"text-black",size:18})})]})}),e.jsx("button",{onClick:f,className:"text-white text-lg font-bold bg-red-500",children:e.jsx(U,{className:"h-4 w-4"})})]})})}),e.jsxs(v,{children:[e.jsx(I,{className:"pl-6 pb-2",children:e.jsxs(R,{children:[" Check-Out Guest "," ",e.jsxs("span",{className:"ml-2 text-sm text-gray-500",children:["(",l.length," to check-out)"]})]})}),e.jsx(N,{children:m?e.jsx("div",{className:"space-y-4",children:l.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(v,{className:"cursor-pointer hover:shadow-lg transition-shadow",children:[e.jsx(N,{className:"p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"font-semibold",children:l[o].guestName}),e.jsx(b,{onClick:i,children:"Check-out"})]})}),e.jsx(P,{className:"h-[100px] m-2 border rounded",children:l[o].reservations.map((t,a)=>e.jsx("div",{className:"mb-2 p-2 bg-gray-50 rounded",children:e.jsx("p",{className:"font-medium",children:t.reservation||`Reservation ${a+1}`})},a))}),e.jsxs("div",{className:"text-sm text-muted-foreground m-2 ",children:[Math.min(o+1,l.length)," of"," ",l.length," entries"]})]}),e.jsxs("div",{className:"flex justify-between mt-4",children:[e.jsx(b,{onClick:D,disabled:o===0,children:"Prev"}),e.jsx(b,{onClick:T,disabled:o===l.length-1,children:"Next"})]})]}):e.jsx("div",{className:"border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300",children:e.jsxs("p",{className:"text-gray-500 text-center m-20",children:['No reservations found for "',m,'"']})})}):e.jsx("div",{className:"border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300",children:e.jsx("p",{className:"text-gray-500 text-center m-20 ",children:"Start searching to view reservations."})})})]})]})})}function we({data:u=[],onClose:f}){const[h,g]=c.useState("all"),[o,p]=c.useState(0),[x,j]=c.useState("newest"),[m,w]=c.useState(""),{toast:C}=V(),{createNotification:_}=M(),{userData:y}=c.useContext(A),l=c.useMemo(()=>{let t=u.filter(r=>r.status==="waiting");m&&(t=t.filter(r=>r.guest_name.toLowerCase().includes(m.toLowerCase())||r.guest_email.toLowerCase().includes(m.toLowerCase()))),h!=="all"&&(t=t.filter(r=>h==="room"?r.reservation_type==="room":h==="venue"?r.reservation_type==="venue":!0));const a=t.reduce((r,s)=>{const n=`${s.guest_name}-${s.guest_email}-${s.reservation_type}-${s.receipt_total_amount}-${s.receipt_id}-${s.timestamp}`;return r[n]||(r[n]={guestId:s.guest_id,guestName:s.guest_name,guestEmail:s.guest_email,guestType:s.guest_type,reservationType:s.reservation_type,receiptDate:s.receipt_date,receiptTotal:s.receipt_total_amount,receiptSubTotal:s.receipt_initial_total,additionalNotes:s.additional_notes,receiptDiscounts:[],reservations:[],reservationRoomID:[],reservationVenueID:[]}),s.receipt_discounts.forEach(d=>{d&&!r[n].receiptDiscounts.some(S=>S.discount_id===d.discount_id)&&r[n].receiptDiscounts.push(d)}),s.reservation_type==="room"?r[n].reservationRoomID.push(s.reservation_id):s.reservation_type==="venue"?r[n].reservationVenueID.push(s.reservation_id):s.reservation_type==="both"&&(s.room_type?r[n].reservationRoomID.push(s.reservation_id):r[n].reservationVenueID.push(s.reservation_id)),r[n].reservations.push(s),r},{});return Object.values(a).sort((r,s)=>{const n=new Date(r.receiptDate),d=new Date(s.receiptDate);return x==="newest"?d.getTime()-n.getTime():n.getTime()-d.getTime()})},[u,h,x,m]),T=()=>{o<l.length-1&&p(o+1)},D=()=>{o>0&&p(o-1)},i=async()=>{if(console.log("Clicked"),!l[o])return;const t=l[o];if(t)try{const a={guest_id:t.guestId,status:"ready",type:t.reservationType};if(t.reservationType==="room")a.reservation_room_ids=t.reservationRoomID;else if(t.reservationType==="venue")a.reservation_venue_ids=t.reservationVenueID;else if(t.reservationType==="both")a.reservation_room_ids=t.reservationRoomID,a.reservation_venue_ids=t.reservationVenueID;else throw new Error("Invalid reservation type.");console.log("Sending status update:",a);const r=await fetch("http://localhost:5000/api/change_status",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!r.ok)throw new Error("Failed to update reservation status.");const s=await r.json();C({title:"Payment Successful",description:"Reservation has been successfully paid.",variant:"success"});let n=y.first_name+" "+y.last_name;const d=new Date().toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});_({type:"Modified",description:`Employee account "${n}" has process payment reservation ids: {"${t.reservationRoomID||t.reservationVenueID}" } - Timestamp: "${d}".`,role:"Administrator"}),f()}catch{C({title:"Payment Failed",description:"Failed to process the payment. Please try again.",variant:"destructive"})}};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(v,{children:e.jsx(N,{className:"p-4",children:e.jsxs("div",{className:"flex flex-row gap-10 justify-between",children:[e.jsx("div",{className:"bg-white rounded-lg border border-white/30 ",children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",placeholder:"Search by name or account...",value:m,onChange:t=>w(t.target.value),className:"pl-10 pr-4 py-2 w-60 md:w-80 border-2 text-black border-black bg-transparent rounded-3xl focus:outline-none focus:border-black"}),e.jsx("div",{className:"absolute inset-y-0 left-2 flex items-center pointer-events-none",children:e.jsx(B,{className:"text-black",size:18})})]})}),e.jsx("button",{onClick:f,className:"text-white text-lg font-bold bg-red-500",children:e.jsx(U,{className:"h-4 w-4"})})]})})}),e.jsxs(v,{children:[e.jsx(I,{className:"pl-6 pb-2",children:e.jsxs(R,{children:["Process Payment"," ",e.jsxs("span",{className:"ml-2 text-sm text-gray-500",children:["(",l.length," to process)"]})]})}),e.jsx(N,{children:m?e.jsx("div",{className:"space-y-4",children:l.length>0?e.jsxs(e.Fragment,{children:[e.jsxs(v,{className:"cursor-pointer hover:shadow-lg transition-shadow",children:[e.jsx(N,{className:"p-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"font-semibold",children:l[o].guestName}),e.jsx(b,{onClick:i,children:"Pay Registration Fee"})]})}),e.jsx(P,{className:"h-[100px] m-2 border rounded",children:l[o].reservations.map((t,a)=>e.jsx("div",{className:"mb-2 p-2 bg-gray-50 rounded",children:e.jsx("p",{className:"font-medium",children:t.reservation||`Reservation ${a+1}`})},a))}),e.jsxs("div",{className:"text-sm text-muted-foreground m-2",children:[Math.min(o+1,l.length)," ","of ",l.length," entries"]})]}),e.jsxs("div",{className:"flex justify-between mt-4",children:[e.jsx(b,{onClick:D,disabled:o===0,children:"Prev"}),e.jsx(b,{onClick:T,disabled:o===l.length-1,children:"Next"})]})]}):e.jsx("div",{className:"border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300",children:e.jsxs("p",{className:"text-gray-500 text-center m-20",children:['No reservations found for "',m,'"']})})}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"border-dashed h-auto w-auto rounded-xl  border-2 border-gray-300",children:e.jsx("p",{className:"text-gray-500 text-center m-20 ",children:"Start searching to view reservations."})})})})]})]})})}const _e=()=>{const{bookingSummary:u}=ne(),f=Z(),[h,g]=c.useState(!1),[o,p]=c.useState(!1),[x,j]=c.useState(!1),{reservationsData:m}=oe(),[w,C]=c.useState(""),[_,y]=c.useState([]),{toast:l}=V(),{selectedDate:T,updateSelectedDate:D}=q();c.useMemo(()=>w?m.filter(n=>n.guest_name.toLowerCase().includes(w.toLowerCase())||n.guest_email.toLowerCase().includes(w.toLowerCase())):m,[m,w]);const i=async n=>{try{const d=await fetch(`http://localhost:5000/api/getReservations${n}`);if(d.status===404){y([]),console.warn(`No reservations found for '${n}'.`);return}if(!d.ok)throw new Error(`Failed to fetch reservations for '${n}'.`);const S=await d.json();y(S)}catch(d){console.error(`Error fetching '${n}' reservations`,d),l({title:"Error",description:`Failed to fetch ${n} reservations. Please try again.`,variant:"destructive"})}},t=()=>i("Waiting"),a=()=>i("Ready"),r=()=>i("OnUse"),s=()=>{j(!1),g(!1),p(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"relative flex flex-col h-screen w-screen overflow-y-auto bg-background",id:"reservation",children:e.jsxs("main",{className:"flex flex-col md:flex-row h-full",children:[e.jsx("div",{className:"flex flex-col md:w-2/3 h-full p-4 space-y-4",children:e.jsxs(v,{className:"flex h-full flex-col flex-1",children:[e.jsxs(I,{className:"flex flex-row items-center justify-between space-y-0 pb-1 mb-1",children:[e.jsx(R,{children:"Available Rooms"}),e.jsxs(he,{children:[e.jsx(xe,{asChild:!0,children:e.jsxs(b,{variant:"outline",className:"w-full sm:w-[280px] justify-start text-left font-normal",children:[e.jsx(se,{className:"mr-2 h-4 w-4"}),T?F(T,"PPP"):e.jsx("span",{children:"Pick a date"})]})}),e.jsx(pe,{className:"w-auto p-0",children:e.jsx(je,{mode:"single",selected:T,onSelect:n=>n&&D(n),initialFocus:!0})})]})]}),e.jsx(N,{className:"overflow-y-auto",children:e.jsx(ye,{})})]})}),e.jsxs("div",{className:"flex flex-col md:w-1/3 h-auto p-6 space-y-3 border-l",children:[e.jsx(v,{children:e.jsx(N,{className:"p-0",children:e.jsx("div",{className:"h-1/4 bg-[#143774] border flex border-gray-200 rounded-lg overflow-hidden justify-center",children:e.jsx(ve,{})})})}),e.jsxs(v,{children:[e.jsx(I,{children:e.jsx(R,{children:"Quick Actions"})}),e.jsxs(N,{className:"flex flex-col space-y-2",children:[e.jsxs(b,{className:"w-full justify-start",onClick:()=>f("/Reservation"),children:[e.jsx(re,{className:"mr-2 h-4 w-4"})," New Reservation"]}),e.jsxs(O,{open:x,onOpenChange:j,children:[e.jsx(L,{asChild:!0,children:e.jsxs(b,{className:"w-full justify-start",variant:"outline",onClick:t,children:[e.jsx(de,{className:"mr-2 h-4 w-4"}),"Process Payment"]})}),e.jsx(E,{className:"flex flex-col bg-transparent border-none",showCloseButton:!1,children:e.jsx(we,{data:_,onClose:s})})]}),e.jsxs(O,{open:h,onOpenChange:g,children:[e.jsx(L,{asChild:!0,children:e.jsxs(b,{className:"w-full justify-start",variant:"outline",onClick:a,children:[e.jsx(le,{className:"mr-2 h-4 w-4"})," Check-in Guest"]})}),e.jsx(E,{className:"flex flex-col bg-transparent border-none shadow-none",showCloseButton:!1,children:e.jsx(be,{data:_,onClose:s})})]}),e.jsxs(O,{open:o,onOpenChange:p,children:[e.jsx(L,{asChild:!0,children:e.jsxs(b,{className:"w-full justify-start",variant:"outline",onClick:r,children:[e.jsx(ce,{className:"mr-2 h-4 w-4"})," Check-out Guest"]})}),e.jsx(E,{className:"flex flex-col bg-transparent border-none shadow-none",showCloseButton:!1,children:e.jsx(Ne,{data:_,onClose:s})})]})]})]}),e.jsxs(v,{children:[e.jsx(I,{children:e.jsx(R,{children:"Booking Summary"})}),e.jsx(N,{className:"overflow-y-auto",children:e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-bold",children:u.total}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Total"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-bold",children:u.rooms}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Rooms"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-bold",children:u.venues}),e.jsx("div",{className:"text-sm text-muted-foreground",children:"Venues"})]})]})})]})]})]})}),e.jsx(me,{containerClassName:"z-[10000]",toastOptions:{className:"z-[10000]"}})]})};function Ke(){const[u,f]=c.useState(!1),[h,g]=c.useState(!1),[o,p]=c.useState(!1),x=()=>{f(!1)};return c.useEffect(()=>{const j=setTimeout(()=>g(!0),300),m=setTimeout(()=>p(!0),1e3);return()=>{clearTimeout(j),clearTimeout(m)}},[]),c.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow="auto"}),[]),e.jsxs("main",{className:"flex flex-col h-screen w-screen overflow-hidden m-0",children:[e.jsx("div",{className:"fixed top-0 left-0 right-0 z-50",children:e.jsx(ee,{handleBackToHome:x})}),e.jsxs("section",{id:"home",className:`relative flex flex-col w-full h-screen transition-all duration-1000 ease-in-out overflow-hidden ${u?"transform -translate-y-full":"translate-y-0"}`,children:[e.jsx("img",{loading:"lazy",src:te,alt:"Lantaka Hotel Background",className:"absolute inset-0 w-full h-full object-cover"}),e.jsx("div",{className:"relative flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-70 px-20 max-md:px-5",children:e.jsxs("div",{className:"flex flex-col items-center w-full max-w-[687px] text-center mt-16",children:[e.jsx("h1",{className:`text-5xl tracking-[10.5px] max-md:text-4xl font-extralight text-gray-100 transition-all duration-1000 ease-out ${h?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`,children:"WELCOME TO"}),e.jsx("h2",{className:`mt-4 text-9xl font-medium tracking-widest leading-none max-md:text-9xl text-gray-100 transition-all duration-1000 ease-out delay-300 ${h?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`,children:e.jsx("span",{children:"LANTAKA "})}),e.jsx("p",{className:`text-[1.7rem] text-white poppins-semibold transition-all duration-1000 ease-out delay-300 ${h?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`,children:"SPIRITUALITY, FORMATION, AND TRAINING CENTER"}),e.jsxs("div",{onClick:()=>{const j=document.getElementById("reservation");j&&j.scrollIntoView({behavior:"smooth"})},className:`relative inline-flex items-center justify-start top-[100px] px-6 py-4 mb-2 text-white bg-transparent border border-transparent rounded-lg group transition-all duration-300 ease-in-out ${o?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`,children:[e.jsx("span",{className:"cursor-pointer flex items-center",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 transition-transform duration-300 group-hover:translate-y-1",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})}),e.jsx("span",{className:"absolute bottom-0 left-1/2 h-1 w-0 bg-yellow-500 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"})]})]})})]}),e.jsx("section",{className:`absolute top-10 left-0 right-0 bottom-0 transition-all duration-1000 ease-in-out overflow-hidden ${u?"translate-y-0":"translate-y-full"} overflow-y-auto`,children:e.jsx(_e,{})})]})}export{Ke as default};
