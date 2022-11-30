import Moment from 'react-moment'

export default function CommentItem({cmt}) {

  return (
    <div className='flex items-center justify-between gap-3'>
      <p className='flex text-gray-300 text-[14px] truncate whitespace-pre-wrap'>{cmt.comment}</p>
     <div className='text-[9px] text-white opacity-50 flex gap-1 min-w-[71px]'>
        <div> <Moment date={cmt.createdAt} format='HH:mm' /></div>
        <div> <Moment date={cmt.createdAt} format='DD-MMM-YY' /></div>
      </div>
    </div>
  )
}
