import check_role from './_checkRole'
export default function(ctx) {
  ctx.role = 'superUser'
  check_role(ctx)
}
