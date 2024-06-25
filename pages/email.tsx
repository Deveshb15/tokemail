import Emailer from '@/components/Emailer/Email'
import { TOKEN_NAME } from '@/lib/utils'
import React from 'react'

const Email = () => {
    return (
        <div><Emailer uid='abcdef' note={`hey fren, enjoy some $${TOKEN_NAME} that I sent you!`} seed="just become vault glow rack perfect flee dentist frame toddler frown hedgehog distance accident you shed trash fly gain wild saddle modify arrange credit" amount={100} symbol='ETH' /></div>
    )
}

export default Email