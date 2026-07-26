FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip setuptools \
    && pip install --no-cache-dir -r requirements.txt

# Copy and install the local Pygments lexer
COPY hooks/CommandLexer /app/hooks/CommandLexer
RUN pip install --no-cache-dir /app/hooks/CommandLexer

COPY . .

EXPOSE 8000

CMD ["properdocs", "serve", "-a", "0.0.0.0:8000", "-f", "properdocs.yml"]
