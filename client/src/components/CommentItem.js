import Moment from 'react-moment'

export default function CommentItem({cmt}) {

  return (
    <div className='flex flex-col items-end justify-between gap-3 mb-6 postItemNoHover'>
      <p className='flex text-[#cbd5e1] text-[14px] truncate whitespace-pre-wrap self-start'>{cmt.comment}</p>
     <div className='text-[9px] text-[#cbd5e1] opacity-50 flex gap-1 min-w-[71px]'>
        <div> <Moment date={cmt.createdAt} format='HH:mm' /></div>
        <div> <Moment date={cmt.createdAt} format='DD-MMM-YY' /></div>
      </div>
    </div>
  )
}
