import { FactoryCards } from "./domain/Cards/FactoryCards";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { format } from "currency-formatter";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FactoryTransaction } from "./domain/Transaction/FactoryTransaction";

function formatCurrency(value: number) {
  const currentValue = value / 100;
  return format(currentValue, { code: "BRL" });
}

function formatDate(currentDate: string) {
  const date = new Date(currentDate);
  return date.toLocaleDateString("pt-BR");
}

export default function Main() {
  const [loading, setLoading] = useState(true);
  const [cards] = useState(new FactoryCards().execute());
  const [transaction] = useState(new FactoryTransaction().execute());

  useEffect(() => {
    async function getTransactions() {
      setLoading(true);
      try {
        await cards.getCards();
        await transaction.list();
      } catch (error) {
        throw new Error("getCards: ", error as Error);
      } finally {
        setLoading(false);
      }
    }
    getTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContainerLogo}>
            <View style={styles.headerLogo}>
              <Text style={styles.headerLogoText}>$</Text>
            </View>
            <Text style={styles.headerTitle}>dt money</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.headerButtonNewTransaction}>
              Nova transação
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal style={styles.containerCards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entradas</Text>
          {loading ? (
            <Text>Carregando...</Text>
          ) : (
            <Text style={styles.cardAmount}>
              {formatCurrency(cards.totalCards.totalIncomingTransactions)}
            </Text>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saídas</Text>
          <Text style={styles.cardAmount}>
            {formatCurrency(cards.totalCards.totalOutgoingTransactions)}
          </Text>
        </View>
        <View
          style={
            cards.totalCards.totalTransactions <= 0
              ? { ...styles.card, ...styles.cardTotalNegative }
              : { ...styles.card, ...styles.cardTotal }
          }
        >
          <Text style={styles.cardTitleTotal}>Total</Text>
          <Text style={styles.cardAmountTotal}>
            {formatCurrency(cards.totalCards.totalTransactions)}
          </Text>
        </View>
      </ScrollView>

      {loading ? (
        <Text style={styles.listDescription}>Carregando...</Text>
      ) : (
        <Text style={styles.listDescription}>Listagem:</Text>
      )}

      <FlatList
        style={styles.listContainerTransactions}
        data={transaction.getList}
        renderItem={({ item }) => (
          <View style={styles.listCardTransaction}>
            <Text style={styles.listCardTransactionDescription}>
              {item.name}
            </Text>
            <Text
              style={
                item.type === "withdrawn"
                  ? styles.listCardTransactionAmountOut
                  : styles.listCardTransactionAmountInput
              }
            >
              {formatCurrency(item.amount)}
            </Text>
            <View style={styles.listCardTransactionCategoryAndDate}>
              <Text style={styles.listCardTransactionCategoryAndDateText}>
                {item.category}
              </Text>
              <Text style={styles.listCardTransactionCategoryAndDateText}>
                {formatDate(item.date)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingBottom: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#5429CC",
    padding: 20,
    paddingTop: 50,
    height: 200,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerContainerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#33CC95",
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerLogoText: {
    fontSize: 20,
    color: "#fff",
  },
  headerButtonNewTransaction: {
    marginLeft: "auto",
    backgroundColor: "#6933FF",
    color: "#fff",
    borderRadius: 5,
    padding: 16,
  },
  containerCards: {
    marginTop: -60,
    marginLeft: 10,
    height: 350,
  },
  card: {
    width: 250,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  cardTotal: {
    backgroundColor: "#33CC95",
  },
  cardTotalNegative: {
    backgroundColor: "#E52E4D",
  },
  cardTitleTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardAmountTotal: {
    fontSize: 30,
    color: "#fff",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#363F5F",
  },
  cardAmount: {
    fontSize: 30,
    color: "#363F5F",
  },
  listContainerTransactions: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  listDescription: {
    fontSize: 20,
    color: "#363F5F",
    paddingLeft: 10,
    marginTop: 30,
    marginBottom: 5,
  },
  listCardTransaction: {
    flex: 1,
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  listCardTransactionDescription: {
    fontSize: 20,
    fontWeight: "600",
    color: "#363F5F",
  },
  listCardTransactionAmountOut: {
    fontSize: 24,
    color: "#E52E4D",
  },
  listCardTransactionAmountInput: {
    fontSize: 24,
    color: "#12A454",
  },
  listCardTransactionCategoryAndDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listCardTransactionCategoryAndDateText: {
    fontSize: 16,
    color: "#969CB2",
  },
});
