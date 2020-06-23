package quexl

import com.quexl.security.*
import marshaller.*

class BootStrap {

    def init = { servletContext ->
        def user = User.findByUsername('superadmin')?: new User(username: 'superadmin', password: 'Superadmin@123', email: 'super@gmail.com', primaryRole: Roles.ROLE_SUPER_ADMIN.toString()).save()
        def role = getRole(Roles.ROLE_SUPER_ADMIN.toString())
        if(!UserRole.findByUserAndRole(user, role)) {
            UserRole.create user, role
            UserRole.withSession {
                it.flush()
                it.clear()
            }
        }
        initRoles()
        UserMarshaller.register()
        UserServiceMarshaller.register()
        DatasetMarshaller.register()
        HistoryMarshaller.register()
        HistoriesMarshaller.register()
        CommentsMarshaller.register()
    }
    def destroy = {
    }

    Role getRole(String role){
        return Role.findOrSaveWhere(authority: role)
    }
    void initRoles(){
        Roles.values().each {
            Role.findOrSaveWhere(authority: it.toString())
        }
    }
}
