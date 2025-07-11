import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, username, roleId
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireRole = (roleIds) => {
  return (req, res, next) => {
    if (!roleIds.includes(req.user.roleId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
