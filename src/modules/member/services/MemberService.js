import reqwest from 'reqwest'
import {api} from '../../../api'
import reqwestWithCsrf from '../../../utils/reqwest'

class MemberService {
    getMemberList(page = 1, limit = 50) {
        return reqwestWithCsrf({
            url: api('member/member'),
            type: 'json',
            data:{
                page,
                limit
            }
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
    searchMember(search) {
        return reqwestWithCsrf({
            url: api('member/member'),
            method: 'get',
            data: {
                search,
                limit: 10
            }
            type: 'json'
        })
    }
}




export default new MemberService()