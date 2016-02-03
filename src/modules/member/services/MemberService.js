import reqwest from 'reqwest'
import {api} from '../../../api'
import reqwestWithCsrf from '../../../utils/reqwestWithCsrf'

class MemberService {
    getMemberList() {
        return reqwest({
            url: api('member/member'),
            type: 'json'
        })
    }

    getMember(memberId) {
        return reqwestWithCsrf({
            url: api('member/member/' + memberId),
            type: 'json'
        })
    }
    registerMember(name, email, lifetime) {
        return reqwestWithCsrf({
            url: api('member/member'),
            method: 'post',
            data: {
                name,
                email,
                lifetime
            },
            type: 'json'
        })
    }
}




export default new MemberService()