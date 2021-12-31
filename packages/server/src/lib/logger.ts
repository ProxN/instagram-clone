import winston, { addColors } from 'winston';

const colorizer = winston.format.colorize();

addColors({
  info: 'bold blue',
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'bold green',
});

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    winston.format.simple(),
    winston.format.printf((msg) =>
      colorizer.colorize(
        msg.level,
        `[${msg.timestamp}] - [${msg.level.toUpperCase()}]: ${msg.message}`
      )
    )
  ),
  transports: [new winston.transports.Console()],
});
