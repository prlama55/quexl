package enums

enum Status {
  PENDING('Pending'),
  INPROGRESS('In progress'),
  COMPLETED('Completed')
  String status

  Status(String status) {
    this.status = status
  }
}
