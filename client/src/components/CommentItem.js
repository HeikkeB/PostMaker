import Moment from 'react-moment'

export default function CommentItem({cmt}) {

  return (
    <div className='flex items-center justify-between'>
      <div className='flex text-gray-300 text-[14px]'>{cmt.comment}</div>
     <div className='text-[9px] text-white opacity-50 flex gap-1'>
        <div> <Moment date={cmt.createdAt} format='HH:mm' /></div>
        <div> <Moment date={cmt.createdAt} format='DD-MMM-YY' /></div>
      </div>
    </div>
  )
}
